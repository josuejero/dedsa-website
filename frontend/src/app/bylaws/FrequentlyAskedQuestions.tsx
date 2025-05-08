import React from 'react';

interface FrequentlyAskedQuestionsProps {
  lastUpdated: string;
}

export default function FrequentlyAskedQuestions({ lastUpdated }: FrequentlyAskedQuestionsProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">How are bylaws amended?</h3>
          <p>
            Bylaws can be amended through a two-thirds vote of members present at a general meeting.
            Proposed amendments must be submitted to the membership at least two weeks before the
            vote.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Who can propose amendments?</h3>
          <p>
            Any DSA member in good standing can propose amendments to the bylaws. Proposals can be
            submitted to the Steering Committee, which will place them on the agenda for a general
            meeting.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">When were the bylaws last updated?</h3>
          <p>
            Our bylaws were last updated on {lastUpdated}. The changes included [description of
            recent changes or &quot;clarifications to committee structure and updates to the
            electoral process&quot;].
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">How do the bylaws relate to DSA national?</h3>
          <p>
            Our chapter bylaws complement the national DSA constitution and bylaws. In any case
            where our local bylaws conflict with national governing documents, the national
            documents take precedence.
          </p>
        </div>
      </div>
    </div>
  );
}
