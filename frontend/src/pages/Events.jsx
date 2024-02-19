import EventsList from "../components/EventsList";
import { useFetch } from "../hooks/useFetch";
import { getEvents } from "../http";

export default function EventsPage() {
  const {isFetching, error: fetchError, fetchedData: events} = useFetch(getEvents, []);

  return <>
    {isFetching && <p>Loading events...</p>}
    {!isFetching && fetchError && <p>{fetchError.message}</p>}
    {!isFetching && !fetchError && <EventsList events={events} />}
  </>;
}