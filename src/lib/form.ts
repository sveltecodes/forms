import { BehaviorSubject, combineLatest, map, type Observable } from "rxjs";
import type { FormConfig } from "./form-config";
import { FormControl } from "./form-control";
import { deepEqual } from "./util";

/**
 * Represents a form instance.
 */
export class Form {
  /**
   * The name of the form.
   */
  public name: string;

  /**
   * The form controls.
   */
  public controls: FormControl<any>[] = [];

  /**
   * The form's validity.
   */
  public valid: Observable<boolean>;

  /**
   * Whether or not the form values have not changed (default true).
   */
  public pristine: Observable<boolean>;

  /**
   * Keeps track of changed fields and their values.
   */
  public changed: BehaviorSubject<Record<string, any>> = new BehaviorSubject({});

  /**
   * Creates a new form instance.
   * @param {FormConfig} config The form configuration.
   */
  public constructor(config: FormConfig) {
    if (config.controls) {
      for (let i = 0; i < config.controls.length; i++) {
        this.addControl(new FormControl(config.controls[i]));
      }
    }

    this.valid = combineLatest(this.controls.map(control => control.errors)).pipe(
      map(errorsArray => errorsArray.every(errors => errors === null || errors.length === 0))
    );

    this.setupChangedTracking();
  }

  /**
   * Adds a control to the form.
   * @param {FormControl} control The control to add.
   */
  public addControl(control: FormControl<any>): void {
    this.controls.push(new FormControl(control));
    this.setupChangedTracking();
  }

  /**
   * Sets up tracking for changes in the form controls.
   */
  private setupChangedTracking(): void {
    combineLatest(this.controls.map(control => control.value.pipe(
      map(value => ({ name: control.name, value, original: control.original }))
    ))).subscribe(changes => {
      const changedValues = changes.reduce((acc, { name, value, original }) => {
        if (!deepEqual(value, original)) {
          acc[name] = value;
        }
        return acc;
      }, {});

      this.changed.next(changedValues);
    });
  }

  /**
   * Gets a control by name.
   * @param {string} name The name of the control.
   * @throws {Error} Thrown if the control is not found by name.
   * @returns {FormControl} The control.
   */
  public getControl<T>(name: string): FormControl<T> {
    const control = this.controls.find(control => control.name === name);
    if (!control) {
      throw new Error(`Control with name ${name} not found`);
    }
    return control;
  }

  /**
   * Gets the latest form values combining all controls.
   * @returns {Observable<Record<string, any>>} The form values.
   */
  public getValues(): Observable<Record<string, any>> {
    return combineLatest(this.controls.map(control =>
      control.value.pipe(
        map(value => ({ [control.name]: value }))
      )
    )).pipe(
      map(values => Object.assign({}, ...values))
    );
  }
}
