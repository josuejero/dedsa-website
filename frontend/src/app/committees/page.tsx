import { contentService } from '@/core/services/contentService';
import type { BylawsPageContent } from '@/core/types/pages/bylaws';

export default function CommitteesPage() {
  const content = contentService.getPageContent('committees') as any;
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Committees page content missing.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-dsa-red-t4 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      </div>
    </div>
  );
}
