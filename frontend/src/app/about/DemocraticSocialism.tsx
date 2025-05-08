import React from 'react';
import Link from 'next/link';

export default function DemocraticSocialism() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">What is Democratic Socialism?</h2>

      <div className="prose prose-lg max-w-none">
        <p>
          Democratic socialism is a political philosophy that advocates for a democratic political
          system alongside a socially owned economy. We believe that both the economy and society
          should be run democratically to meet human needs, not to make profits for a few.
        </p>
        <p>Democratic socialists envision a society where:</p>
        <ul>
          <li>
            <strong>Economic rights are human rights.</strong> This includes the right to
            healthcare, housing, education, and dignified work.
          </li>
          <li>
            <strong>Democracy extends beyond the ballot box.</strong> Working people should have a
            say in economic decisions that affect their lives, including in their workplaces.
          </li>
          <li>
            <strong>Resources and power are distributed equitably.</strong> Wealth and resources
            should benefit the many, not the few.
          </li>
          <li>
            <strong>Marginalized communities have equal access to rights and resources.</strong> We
            fight against all forms of oppression, including racism, sexism, homophobia, and
            xenophobia.
          </li>
        </ul>
        <p>
          We work towards these goals through grassroots organizing, coalition building, electoral
          engagement, and direct action. Our approach is both pragmatic and visionary—we fight for
          immediate reforms that improve people&apos;s lives today while building movements for
          transformative change.
        </p>
      </div>
      <div className="mt-6">
        <Link href="/what-we-stand-for" className="text-dsa-red hover:underline flex items-center">
          Learn more about what we stand for
          <svg className="h-5 w-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
