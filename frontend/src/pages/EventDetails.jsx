import { useParams } from "react-router-dom";

import EventItem from "../components/EventItem";
import { useFetch } from "../hooks/useFetch";
import { getEventById } from "../http";

export default function EventDetailPage() {
  const params = useParams();
  const { isFetching, error, fetchedData } = useFetch(getEventById, {}, params.eventId);

  return <>
    {isFetching && !error && <p>Fetching info...</p>}
    {!isFetching && error && <p>Error: {error.message}</p>}
    {!isFetching && !error && (
      <EventItem event={fetchedData} />
    )}
  </>;
}