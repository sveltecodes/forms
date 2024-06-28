import { combineLatest, map, type Observable } from "rxjs";
import type { FormConfig } from "./form-config";
import { FormControl } from "./form-control";

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
  }

  /**
   * Adds a control to the form.
   * @param {FormControl} control The control to add.
   */
  public addControl(control: FormControl<any>): void {
    this.controls.push(new FormControl(control));
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