// frontend/src/types/content/contact.ts

// Page content types
export interface ContactInfo {
  email: string;
  phone: string;
  mailingAddress: string;
}

export interface ContactType {
  label: string;
}

export interface SocialLinkType {
  name: string;
  url: string;
}

export interface ContactPageSections {
  getInTouch: {
    title: string;
    contactTypes: {
      email: ContactType;
      phone: ContactType;
      mailingAddress: ContactType;
    };
  };
  sendMessage: {
    title: string;
  };
  followUs: {
    title: string;
    socialLinks: SocialLinkType[];
  };
}

export interface ContactPageContent {
  heading: string;
  fallbackContent: string;
  fallbackContactInfo: ContactInfo;
  sections: ContactPageSections;
  error: {
    title: string;
    actionLabel: string;
  };
}

// Contact form types
export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  label: string;
  required: boolean;
  placeholder: string;
  options?: FormFieldOption[];
  rows?: number;
}

export interface ContactFormContent {
  formFields: {
    name: FormField;
    email: FormField;
    subject: FormField;
    message: FormField;
  };
  buttons: {
    submit: string;
    sending: string;
  };
  validation: {
    requiredFields: string;
  };
  success: {
    title: string;
    message: string;
    buttonText: string;
  };
  error: {
    general: string;
    title: string;
  };
}
