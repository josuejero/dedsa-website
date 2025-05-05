'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    errorMessage: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        errorMessage: 'Please fill out all required fields.',
      });
      return;
    }

    setFormState({ ...formState, isSubmitting: true, isError: false, errorMessage: '' });

    try {
      // In a real implementation, this would call the API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error('Failed to send message');

      // Simulate API call success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        errorMessage: '',
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        errorMessage: 'Failed to send message. Please try again later.',
      });
    }
  };

  // If the form was successfully submitted, show a success message
  if (formState.isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <svg
          className="h-12 w-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-lg font-bold mb-2">Thank You!</h3>
        <p className="mb-4">
          Your message has been sent successfully. We'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setFormState({ ...formState, isSubmitted: false })}
          className="btn btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formState.isError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">
          {formState.errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
        >
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Membership">Membership</option>
          <option value="Events">Events</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50"
        />
      </div>

      <div>
        <button type="submit" disabled={formState.isSubmitting} className="w-full btn btn-primary">
          {formState.isSubmitting ? (
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  );
}
