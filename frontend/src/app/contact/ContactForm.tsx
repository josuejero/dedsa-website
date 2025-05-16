'use client';

import React, { useCallback, useReducer } from 'react';
import formContent from '../../content/contact/contactForm.json';
import { ContactFormContent } from '../../types/content/contact';

type FieldKey = keyof ContactFormContent['formFields'];
interface FormState {
  values: Record<string, string>;
  status: 'idle' | 'submitting' | 'submitted' | 'error';
  errorMessage: string;
}
type Action =
  | { type: 'CHANGE'; field: string; value: string }
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; message: string }
  | { type: 'RESET' };

const content = formContent as ContactFormContent;
const initialValues: Record<string, string> = Object.fromEntries(
  Object.keys(content.formFields).map((k) => [k, ''])
);

function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      };
    case 'SUBMIT':
      return { ...state, status: 'submitting', errorMessage: '' };
    case 'SUCCESS':
      return { ...state, status: 'submitted', values: initialValues };
    case 'ERROR':
      return { ...state, status: 'error', errorMessage: action.message };
    case 'RESET':
      return { values: initialValues, status: 'idle', errorMessage: '' };
    default:
      return state;
  }
}

function useContactForm() {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    status: 'idle',
    errorMessage: '',
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      dispatch({ type: 'CHANGE', field: e.target.name, value: e.target.value }),
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { name, email, message } = state.values;
      if (!name || !email || !message) {
        dispatch({ type: 'ERROR', message: content.validation.requiredFields });
        return;
      }
      dispatch({ type: 'SUBMIT' });
      try {
        await new Promise((r) => setTimeout(r, 1000));
        dispatch({ type: 'SUCCESS' });
      } catch {
        dispatch({ type: 'ERROR', message: content.error.general });
      }
    },
    [state.values]
  );

  const handleReset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return { state, handleChange, handleSubmit, handleReset };
}

interface FieldProps {
  name: FieldKey;
  field: ContactFormContent['formFields'][FieldKey];
  value: string;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}

const Field: React.FC<FieldProps> = ({ name, field, value, onChange }) => {
  const base =
    'w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50';
  const common = { id: name, name, value, onChange, className: base };
  if (field.options) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}{' '}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <select {...common}>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (field.rows) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {field.label}{' '}
          {field.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          {...common}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows}
        />
      </div>
    );
  }
  // Infer input type since `field.type` doesn’t exist
  const inputType = name === 'email' ? 'email' : 'text';
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {field.label}{' '}
        {field.required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...common}
        type={inputType}
        placeholder={field.placeholder}
        required={field.required}
      />
    </div>
  );
};

export default function ContactForm() {
  const { state, handleChange, handleSubmit, handleReset } = useContactForm();

  if (state.status === 'submitted') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <svg
          className="h-12 w-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="text-lg font-bold mb-2">{content.success.title}</h3>
        <p className="mb-4">{content.success.message}</p>
        <button onClick={handleReset} className="btn btn-primary">
          {content.success.buttonText}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {state.status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
          {state.errorMessage}
        </div>
      )}

      {Object.entries(content.formFields).map(([key, field]) => (
        <Field
          key={key}
          name={key as FieldKey}
          field={field as ContactFormContent['formFields'][FieldKey]}
          value={state.values[key]}
          onChange={handleChange}
        />
      ))}

      <button
        type="submit"
        disabled={state.status === 'submitting'}
        className="w-full btn btn-primary"
      >
        {state.status === 'submitting' ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {content.buttons.sending}
          </span>
        ) : (
          content.buttons.submit
        )}
      </button>
    </form>
  );
}
