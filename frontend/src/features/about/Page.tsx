import AboutHero from './components/AboutHero';
import Achievements from './components/Achievements';
import DemocraticSocialism from './components/DemocraticSocialism';
import GetInvolved from './components/GetInvolved';
import NationalInfo from './components/NationalInfo';
import Timeline from './components/Timeline';
import { AboutPageProps } from './types';

export default function AboutPage(props: AboutPageProps) {
  return (
    <div className="bg-gray-100 py-12 pt-10">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-4">About Delaware DSA</h1>
        <AboutHero missionStatement={props.missionStatement} />
        <Timeline
          foundingYear={props.foundingYear}
          yearsActive={props.yearsActive}
        />
        <Achievements achievements={props.achievements} />
        <DemocraticSocialism />
        <GetInvolved />
        <NationalInfo />
      </div>
    </div>
  );
}
