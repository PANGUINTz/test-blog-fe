import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define a type for each field's validation rule
type ValidationRule = {
  required?: boolean;
  message: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};

// Define a type for the validation rules object, which maps field names to rules
type ValidationRules = {
  [key: string]: ValidationRule;
};

// Define a type for the errors object, which maps field names to error messages
type Errors = {
  [key: string]: string;
};

// The form object can be of any shape, but usually has strings or undefined values
type Form = {
  [key: string]: any;
};

export const validateForm = ({
  form,
  validationRules,
}: {
  form: Form;
  validationRules: ValidationRules;
}): Errors => {
  const errors: Errors = {};

  for (const [field, rules] of Object.entries(validationRules)) {
    if (rules.required && !form[field]) {
      errors[field] = rules.message;
    } else if (rules.pattern && !rules.pattern.value.test(form[field])) {
      errors[field] = rules.pattern.message;
    }
  }

  return errors;
};

export const timeAgo = (dateString: string) => {
  const date: any = new Date(dateString);
  const now: any = new Date();

  const diffInMs = now - date;

  const minutes = Math.floor(diffInMs / (1000 * 60));
  if (minutes < 1) return "just now";
  if (minutes < 60)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
};
