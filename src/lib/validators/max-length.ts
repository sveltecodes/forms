import { Observable, map } from "rxjs";
import type { ValidationResult, Validator } from "./validator";

/**
 * Checks if the value is no more than the provided length.
 * @param {number} length The maximum length.
 * @returns {Validator<string>} The validator function.
 */
export const maxLength = (length: number): Validator<string> => {
	return {
		fn: (value: Observable<string>): Observable<ValidationResult> => {
			return value.pipe(
				map((val: string) => {
					if (!val || val.length > length) {
						return {
							valid: false,
							messages: [`must be no more than ${length} characters`]
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
