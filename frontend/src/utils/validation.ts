export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const re = /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
  return re.test(phone);
};

export const validateZipCode = (zipCode: string): boolean => {
  const re = /^\d{5}(-\d{4})?$/;
  return re.test(zipCode);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateLength = (value: string, min: number, max: number): boolean => {
  const length = value.trim().length;
  return length >= min && length <= max;
};

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (
  data: Record<string, string>,
  rules: Record<string, Array<(value: string) => boolean>>
): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, validations]) => {
    const value = data[field];

    for (const validate of validations) {
      if (!validate(value)) {
        errors[field] = `Invalid ${field.toLowerCase()}`;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
