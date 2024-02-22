import { useLoaderData, json } from "react-router-dom";

import EventsList from "../components/EventsList";

import { BASE_URL } from "../http";

export default function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />
}

export async function loader() {
  const response = await fetch(`${BASE_URL}/events`);
  if (!response.ok) {
    return json({ message: "Unknown error fetching events." }, {
      status: 500
    });
  } else {
    return response;
  }
}