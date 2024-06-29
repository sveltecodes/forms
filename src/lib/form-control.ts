import { BehaviorSubject, Observable, ReplaySubject, combineLatest, distinctUntilChanged, from, map, switchMap } from "rxjs";
import type { ValidationResult, Validator } from "./validators/validator";

export class FormControl<T> {
  public name: string;
  public placeholder?: string;
  public validators?: Validator<any>[];
  public value?: ReplaySubject<any> = new ReplaySubject(1);
  public errors?: BehaviorSubject<ValidationResult[]> = new BehaviorSubject([]);
  public data?: T;

  public constructor(obj: FormControl<T>) {
    Object.assign(this, obj);

    this.value.pipe(
      distinctUntilChanged(),
      switchMap(() => this.validate())
    ).subscribe(errors => {
      this.errors.next(errors);
    });
  }

  public validate?(): Observable<ValidationResult[]> {
    if (!this.validators || this.validators.length === 0) {
      return from([null]);
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
}