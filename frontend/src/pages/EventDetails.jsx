import { Suspense } from "react";
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";

import EventItem from "../components/EventItem";
import { BASE_URL } from "../http";
import { loadEvents } from "./Events";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData('event-details');

  return (
    <>
      <Suspense fallback={<p>Loading events...</p>}>
        <Await resolve={event}>
          {(event) => <EventItem event={event} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading events...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
    
}

export async function loadEvent(id) {
  const response = await fetch(`${BASE_URL}/events/${id}`);
  if (!response.ok) {
    return json({ message: "Unknown error fetching event." }, {
      status: 500
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({params}) {
  return defer({
    event: await loadEvent(params.eventId),
    events: loadEvents()
  });
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