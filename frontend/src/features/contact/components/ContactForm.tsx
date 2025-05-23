import { useForm } from '@/core/hooks/useForm';
import type { ContactFormContent } from '@/core/types/pages/contact';

export default function ContactForm(props: ContactFormContent) {
  const { formFields, buttons, validation, success, error } = props;
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
      // TODO: Implement actual submission
    }
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
      
      <form onSubmit={form.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            {formFields.name.label}
            {formFields.name.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            placeholder={formFields.name.placeholder}
            className="w-full px-3 py-2 border rounded-md"
            required={formFields.name.required}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {formFields.email.label}
            {formFields.email.required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="email"
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            placeholder={formFields.email.placeholder}
            className="w-full px-3 py-2 border rounded-md"
            required={formFields.email.required}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">
            {formFields.message.label}
            {formFields.message.required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            name="message"
            value={form.values.message}
            onChange={form.handleChange}
            placeholder={formFields.message.placeholder}
            className="w-full px-3 py-2 border rounded-md"
            rows={formFields.message.rows}
            required={formFields.message.required}
          />
        </div>
        
        <button
          type="submit"
          disabled={form.isSubmitting}
          className="btn btn-primary w-full"
        >
          {form.isSubmitting ? buttons.sending : buttons.submit}
        </button>
      </form>
    </div>
  );
}
