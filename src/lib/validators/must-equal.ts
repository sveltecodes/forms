import { Observable, map } from "rxjs";
import type { ValidationResult, Validator } from "./validator";

/**
 * Checks if the value is equal to the provided value.
 * @param {any} v Value to compare to.
 * @returns {Validator<string>} The validator function.
 */
export const mustEqual = (v: any): Validator<string> => {
	return {
		fn: (value: Observable<string>): Observable<ValidationResult> => {
			return value.pipe(
				map((val: string) => {
					if (!val || val !== v) {
						return {
							valid: false,
							messages: [`must match ${v}`]
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
