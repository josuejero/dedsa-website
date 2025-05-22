import type { LeadershipPageContent, ChapterStructureContent, LeadershipCardContent } from '@/core/types/pages/leadership';
type Props = LeadershipPageContent & { chapterStructure: ChapterStructureContent; leadershipCard: LeadershipCardContent };
export default function LeadershipPage(props: Props) {
  // TODO: render the leadership page using props.title, props.chapterStructure, props.leadershipCard, etc.
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
