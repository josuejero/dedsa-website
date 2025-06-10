import useSWR from 'swr';

type Raw = {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  location?: string;
};

export function useGoogleCalendar() {
  const fetcher = (url: string) =>
    fetch(url).then((res) => res.json() as Promise<Raw[]>);
  const { data, error } = useSWR('/api/events', fetcher);

  const events =
    data?.map((e) => {
      const dt = e.start.dateTime ?? e.start.date!;
      return {
        title: e.summary,
        date: new Date(dt).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
        location: e.location || 'TBD',
        isVirtual: !!e.location?.toLowerCase().match(/zoom|jitsi|meet/),
      };
    }) ?? [];

  return { events, isLoading: !data && !error, isError: !!error };
}
