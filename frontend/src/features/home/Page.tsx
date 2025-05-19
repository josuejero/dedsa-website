// src/features/home/Page.tsx
import { Metadata } from 'next';
import { ChapterStatsSection } from './components/ChapterStatsSection';
import { GetInvolvedSection } from './components/GetInvolvedSection';
import { HeroSection } from './components/HeroSection';
import { JoinCTASection } from './components/JoinCTASection';
import { LatestUpdatesSection } from './components/LatestUpdatesSection';
import { MissionSection } from './components/MissionSection';
import { StrategicPrioritiesSection } from './components/StrategicPrioritiesSection';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Delaware chapter of the Democratic Socialists of America (DSA).',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <StrategicPrioritiesSection />
      <GetInvolvedSection />
      <ChapterStatsSection />
      <LatestUpdatesSection />
      <JoinCTASection />
    </>
  );
}
