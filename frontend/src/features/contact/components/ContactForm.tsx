'use client';
import ValidatedForm from '@/core/components/forms/ValidatedForm';
import type { ContactFormContent } from '@/core/types/pages/contact';
import { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';

interface FormValues {
  [key: string]: unknown;
  name: string;
  email: string;
  subject: string;
  message: string;
}

const schema: yup.ObjectSchema<FormValues> = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    subject: yup.string().default(''),
    message: yup.string().required('Message is required'),
  })
  .required();

export default function ContactForm(props: ContactFormContent) {
  const { formFields, buttons } = props;

  const handleSubmit = async (values: FormValues) => {
    console.log('Form submitted:', values);
  };

  const renderFields = (form: UseFormReturn<FormValues>) => (
    <>
      <div>
        <label className="block text-sm font-medium mb-1">
          {formFields.name.label}
          {formFields.name.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="text"
          {...form.register('name')}
          placeholder={formFields.name.placeholder}
          className="w-full px-3 py-2 border rounded-md"
        />
        {form.formState.errors.name && (
          <p className="text-red-500" role="alert">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {formFields.email.label}
          {formFields.email.required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="email"
          {...form.register('email')}
          placeholder={formFields.email.placeholder}
          className="w-full px-3 py-2 border rounded-md"
        />
        {form.formState.errors.email && (
          <p className="text-red-500" role="alert">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {formFields.message.label}
          {formFields.message.required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          {...form.register('message')}
          placeholder={formFields.message.placeholder}
          className="w-full px-3 py-2 border rounded-md"
          rows={formFields.message.rows}
        />
        {form.formState.errors.message && (
          <p className="text-red-500" role="alert">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      <button type="submit" disabled={form.formState.isSubmitting} className="btn btn-primary w-full">
        {form.formState.isSubmitting ? buttons.sending : buttons.submit}
      </button>
    </>
  );

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
      <ValidatedForm<FormValues> schema={schema} onSubmit={handleSubmit}>
        {renderFields}
      </ValidatedForm>
    </div>
  );
}
