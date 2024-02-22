import { useRouteLoaderData } from 'react-router-dom';
import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const data = useRouteLoaderData('event-details');

  return <>
    <h1>Edit an event</h1>
    <EventForm method="patch" event={data.event}/>
  </>;
}