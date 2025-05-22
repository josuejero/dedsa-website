import { contentService } from '@/core/services/contentService';
import type { BylawsPageContent as BylawsContent } from '@/core/types/pages/bylaws';
import BylawsDocument from './components/BylawsDocument';
import FrequentlyAskedQuestions from './components/FrequentlyAskedQuestions';
import KeyGovernanceSections from './components/KeyGovernanceSections';
import OtherDocuments from './components/OtherDocuments';

export default function BylawsPage() {
  // grab the full JSON under "bylaws" key
  const data = contentService.getPageContent('bylaws') as BylawsContent;

  return (
    <div className="space-y-12">
      <BylawsDocument bylawsPdf={data.pdfUrl} />
      <KeyGovernanceSections bylawsPdf={data.pdfUrl} />
      <FrequentlyAskedQuestions lastUpdated={data.lastUpdatedLabel} />
      <OtherDocuments />
    </div>
  );
}
