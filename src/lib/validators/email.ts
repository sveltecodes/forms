import { Observable, map } from "rxjs";
import type { ValidationResult, Validator } from "./validator";

/**
 * Checks for a valid email address.
 * @returns {Validator<string>} The validator function.
 */
export const email = (): Validator<string> => {
	return {
		fn: (value: Observable<string>): Observable<ValidationResult> => {
			return value.pipe(
				map((val: string) => {
					if (!val || val.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length === 0) {
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
