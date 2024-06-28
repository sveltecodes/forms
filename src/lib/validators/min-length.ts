import { Observable, map } from "rxjs";
import type { ValidationResult, Validator } from "./validator";

/**
 * Checks if the value is at least the provided length.
 * @param {number} length The minimum length.
 * @returns {Validator<string>} The validator function.
 */
export const minLength = (length: number): Validator<string> => {
	return {
		fn: (value: Observable<string>): Observable<ValidationResult> => {
			return value.pipe(
				map((val: string) => {
					if (!val || val.length < length) {
						return {
							valid: false,
							messages: [`must be at least ${length} characters`]
						};
					} else {
						return {
							valid: true,
							messages: []
						};
					}
				})
			);
		}
	};
};
