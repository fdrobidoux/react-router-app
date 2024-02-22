import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return <>
    <h1>Create a new event</h1>
    <EventForm method="post" />
  </>;
}