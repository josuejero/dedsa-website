'use client';

import { useRouter, usePathname } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface NewsletterCategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  postsCount: number;
}

export default function NewsletterCategoryFilter({
  categories,
  selectedCategory,
  postsCount,
}: NewsletterCategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  
  const handleCategoryChange = (categorySlug: string | null) => {
    
    if (categorySlug === null) {
      router.push(pathname);
    } else {
      
      router.push(`${pathname}?category=${categorySlug}`);
    }
  };

  return (
    <ul className="space-y-2">
      <li>
        <button
          className={`w-full text-left py-1 ${
            selectedCategory === null
              ? 'font-semibold text-dsa-red'
              : 'text-gray-700 hover:text-dsa-red'
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          All Posts ({postsCount})
        </button>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            className={`w-full text-left py-1 ${
              selectedCategory === category.slug
                ? 'font-semibold text-dsa-red'
                : 'text-gray-700 hover:text-dsa-red'
            }`}
            onClick={() => handleCategoryChange(category.slug)}
          >
            {category.name} ({category.count})
          </button>
        </li>
      ))}
    </ul>
  );
}
