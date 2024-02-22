import { useRouteLoaderData, json, redirect } from "react-router-dom";

import EventItem from "../components/EventItem";
import { useFetch } from "../hooks/useFetch";
import { BASE_URL, getEventById } from "../http";

export default function EventDetailPage() {
  const data = useRouteLoaderData('event-details');

  return <>
    <EventItem event={data.event} />
  </>;
}

export async function loader({request, params}) {
  const response = await fetch(`${BASE_URL}/events/${params.eventId}`);

  if (!response.ok) {
    throw json({message: "Could not fetch details"}, {
      status: 500
    });
  }

  return response;
}

export async function action({ request, params }) {
  const response = await fetch(`${BASE_URL}/events/${params.eventId}`, {
    method: request.method
  });

  if (!response.ok) {
    throw json({message: "Could not delete event."}, {
      status: 500
    });
  }

  return redirect('/events');
}