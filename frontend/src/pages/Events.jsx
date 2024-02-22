import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

import { BASE_URL } from "../http";

export default function EventsPage() {
  const { events } = useLoaderData();

  return <Suspense fallback={<p>Loading this...</p>}>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
  </Suspense>;
}

export async function loadEvents() {
  const response = await fetch(`${BASE_URL}/events`);
  if (!response.ok) {
    return json({ message: "Unknown error fetching events." }, {
      status: 500
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loadEvents()
  });
}