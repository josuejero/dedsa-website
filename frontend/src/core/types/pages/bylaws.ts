import {
  BylawsDocumentContent,
  FAQContent,
  KeyGovernanceSectionsContent,
  OtherDocumentsContent,
} from '../../../types/content/bylaws';
// frontend/src/types/content/bylaws.ts

export interface BylawsPageContent {
  title: string;
  fallbackContent: string;
  currentVersionLabel: string;
  lastUpdatedLabel: string;
  downloadButtonText: string;
  pdfUrl: string;
  bylawsDocument: BylawsDocumentContent;
  keyGovernanceSections: KeyGovernanceSectionsContent['sections'];
  frequentlyAskedQuestions: FAQContent['questions'];
  otherDocuments: OtherDocumentsContent['documents'];
}
