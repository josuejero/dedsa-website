// src/app/page.tsx
import { Metadata } from 'next';
import ChapterStatsSection from '../components/home/ChapterStatsSection';
import GetInvolvedSection from '../components/home/GetInvolvedSection';
import HeroSection from '../components/home/HeroSection';
import JoinCTASection from '../components/home/JoinCTASection';
import LatestUpdatesSection from '../components/home/LatestUpdatesSection';
import MissionSection from '../components/home/MissionSection';
import StrategicPrioritiesSection from '../components/home/StrategicPrioritiesSection';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Delaware chapter of the Democratic Socialists of America (DSA).',
};

export default function Home() {
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
