import { Observable } from 'rxjs';

/**
 * The result of a validation.
 */
export interface ValidationResult {
	/**
	 * Whether the validation is valid.
	 */
	valid: boolean;

	/**
	 * The validation messages.
	 */
	messages?: string[];
}

/**
 * A validator function.
 */
export interface Validator<T> {
	/**
	 * The validation function.
	 * @param {Observable<T>} value The value to validate.
	 * @returns {Observable<ValidationResult>} The validation result.
	 */
	fn: (value: Observable<T>) => Observable<ValidationResult>;
}
