namespace Validation {
  export type Error = string;

  export type Errors = Array<Error>;

  export interface ValidationResult {
    valid: boolean,
    errors: Errors
  }
}
