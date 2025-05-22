import type { JoinPageContent } from '@/core/types/pages/join';
type Props = JoinPageContent;
export default function JoinPage(props: Props) {
  // TODO: render the join page using props.xxx
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
