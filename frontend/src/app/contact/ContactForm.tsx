'use client';

import React, { useCallback, useReducer } from 'react';
import formJson from '../../content/contact/contactForm.json';
import { ContactFormContent } from '../../types/content/contact';

// Inline cast
const cfg = formJson as ContactFormContent;

type Key = keyof typeof cfg.formFields;
type Values = Record<Key, string>;
interface State {
  values: Values;
  status: 'idle' | 'submitting' | 'submitted' | 'error';
  error: string;
}
type Action =
  | { type: 'CHANGE'; k: Key; v: string }
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; msg: string }
  | { type: 'RESET' };

const empty = Object.fromEntries(
  Object.keys(cfg.formFields).map((k) => [k, ''])
) as Values;

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'CHANGE':
      return { ...s, values: { ...s.values, [a.k]: a.v } };
    case 'SUBMIT':
      return { ...s, status: 'submitting', error: '' };
    case 'SUCCESS':
      return { values: empty, status: 'submitted', error: '' };
    case 'ERROR':
      return { ...s, status: 'error', error: a.msg };
    case 'RESET':
      return { values: empty, status: 'idle', error: '' };
  }
}

function useForm() {
  const [s, d] = useReducer(reducer, {
    values: empty,
    status: 'idle',
    error: '',
  });

  const onChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => d({ type: 'CHANGE', k: e.target.name as Key, v: e.target.value }),
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { name, email, message } = s.values;
      if (!name || !email || !message) {
        return d({ type: 'ERROR', msg: cfg.validation.requiredFields });
      }
      d({ type: 'SUBMIT' });
      try {
        await new Promise((r) => setTimeout(r, 1000));
        d({ type: 'SUCCESS' });
      } catch {
        d({ type: 'ERROR', msg: cfg.error.general });
      }
    },
    [s.values]
  );

  return { s, onChange, onSubmit, onReset: () => d({ type: 'RESET' }) };
}

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 inline-block"
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
);

function Field({
  name,
  field,
  value,
  onChange,
}: {
  name: Key;
  field: (typeof cfg.formFields)[Key];
  value: string;
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
}) {
  const base =
    'w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red/50';
  const label = (
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {field.label}
      {field.required && <span className="text-red-500">*</span>}
    </label>
  );
  const common = { id: name, name, value, onChange, className: base };

  // Narrow by checking property existence
  if ('options' in field && Array.isArray(field.options)) {
    return (
      <div>
        {label}
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

  if ('rows' in field && typeof field.rows === 'number') {
    return (
      <div>
        {label}
        <textarea
          {...common}
          rows={field.rows}
          placeholder={field.placeholder}
          required={field.required}
        />
      </div>
    );
  }

  // Fallback to simple input
  return (
    <div>
      {label}
      <input
        {...common}
        type={name === 'email' ? 'email' : 'text'}
        placeholder={field.placeholder}
        required={field.required}
      />
    </div>
  );
}

export default function ContactForm() {
  const { s, onChange, onSubmit, onReset } = useForm();

  if (s.status === 'submitted') {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <svg
          className="h-12 w-12 mx-auto mb-4 text-green-500"
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
        <h3 className="text-lg font-bold mb-2">{cfg.success.title}</h3>
        <p className="mb-4">{cfg.success.message}</p>
        <button onClick={onReset} className="btn btn-primary">
          {cfg.success.buttonText}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {s.status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          {s.error}
        </div>
      )}

      {(
        Object.entries(cfg.formFields) as [Key, (typeof cfg.formFields)[Key]][]
      ).map(([k, f]) => (
        <Field
          key={k}
          name={k}
          field={f}
          value={s.values[k]}
          onChange={onChange}
        />
      ))}

      <button
        type="submit"
        disabled={s.status === 'submitting'}
        className="w-full btn btn-primary"
      >
        {s.status === 'submitting' ? (
          <>
            <Spinner />
            {cfg.buttons.sending}
          </>
        ) : (
          cfg.buttons.submit
        )}
      </button>
    </form>
  );
}
