import type { FormControl } from "./form-control";

export interface FormConfig {
  name: string;
  controls?: FormControl[];
}