import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  combineLatest,
  distinctUntilChanged,
  from,
  map,
  switchMap,
} from "rxjs";
import { deepEqual } from "./util";
import type { ValidationResult, Validator } from "./validators/validator";

export class FormControl<T> {
  public name: string;
  public placeholder?: string;
  public validators?: Validator<any>[];
  public value?: ReplaySubject<T> | any;
  public errors?: ReplaySubject<ValidationResult[]> = new ReplaySubject(1);
  public data?: T;
  public original?: T;

  /**
 * Whether or not the form values have not changed (default true).
 */
  public pristine?: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public constructor(obj: Partial<FormControl<T>>) {
    Object.assign(this, obj);

    if (obj.value instanceof ReplaySubject) {
      this.value = obj.value;
      obj.value.subscribe((value: T) => {
        this.original = value;
      });
    } else {
      this.original = obj.value;
      this.value = new ReplaySubject<T>(1);
      if (obj.value !== undefined) {
        this.value.next(obj.value as T);
      }
    }

    this.value.pipe(
      distinctUntilChanged(),
      switchMap(() => this.validate())
    ).subscribe((errors: ValidationResult[]) => {
      this.errors.next(errors);
    });
  }

  public validate?(): Observable<ValidationResult[]> {
    if (!this.validators || this.validators.length === 0) {
      return from([]);
    }

    const validatorObservables = this.validators.map(validator =>
      from(validator.fn(this.value)).pipe(
        map(result => result.valid ? null : result)
      )
    );

    return combineLatest(validatorObservables).pipe(
      map(results => results.filter(result => result !== null).flat())
    );
  }

  public equals?(): Observable<boolean> {
    return this.value.pipe(
      map(value => deepEqual(value, this.original))
    );
  }
}
