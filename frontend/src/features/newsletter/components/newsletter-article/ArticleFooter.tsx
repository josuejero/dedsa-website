import Link from 'next/link';

export default function ArticleFooter() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <Link href="/newsletter" className="btn btn-secondary">
          ← Back to All Newsletters
        </Link>

        <div className="flex space-x-4">
          <button className="text-dsa-red hover:underline">Share</button>
          <button className="text-dsa-red hover:underline">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
