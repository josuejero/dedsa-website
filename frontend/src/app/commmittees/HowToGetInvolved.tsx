import React from 'react';
import Link from 'next/link';

export default function HowToGetInvolved() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">How to Get Involved</h2>

      <p className="mb-4">Getting involved with a committee or working group is easy:</p>

      <ol className="list-decimal pl-6 mb-6 space-y-2">
        <li>Attend one of our general meetings to learn more about active committees</li>
        <li>Reach out directly to the committee contact listed above</li>
        <li>Check our calendar for upcoming committee meetings</li>
        <li>Join our Slack workspace to connect with committee channels</li>
      </ol>

      <p className="mb-6">
        All committees are open to any DSA member. Not a member yet? Join today!
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/join" className="btn btn-primary">
          Join Delaware DSA
        </Link>
        <Link href="/calendar" className="btn btn-secondary">
          View Calendar
        </Link>
      </div>
    </div>
  );
}
