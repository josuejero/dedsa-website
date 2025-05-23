// src/core/types/pages/bylaws.ts
export interface BylawsDocumentContent {
  title: string;
  fallbackMessage: string;
  downloadLinkText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  questions: FAQItem[];
}

export interface GovernanceSection {
  title: string;
  description: string;
  pageLink: string;
  linkText: string;
}

export interface KeyGovernanceSectionsContent {
  title: string;
  sections: GovernanceSection[];
}

export interface Document {
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface OtherDocumentsContent {
  title: string;
  documents: Document[];
}

// Main page content interface
export interface BylawsPageContent {
  title: string;
  pdfUrl: string; // Added missing property
  fallbackContent: string;
  currentVersionLabel: string;
  lastUpdatedLabel: string;
  downloadButtonText: string;
  bylawsDocument?: BylawsDocumentContent;
  keyGovernanceSections?: KeyGovernanceSectionsContent['sections'];
  frequentlyAskedQuestions?: FAQContent['questions'];
  otherDocuments?: OtherDocumentsContent['documents'];
}
