import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { createEvent } from "../http";

export default function NewEventPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [errorsList, setErrorsList] = useState({});

  async function onFormSendHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const eventData = Object.fromEntries(fd.entries());
    try {
      await createEvent(eventData).then(() => {
        navigate('/events');
      });
    } catch (e) {
      setError(e.message);
      setErrorsList(e.errors);
    }
  }

  return <>
    <h1>Create a new event</h1>
    {error && <p style={{color: 'red'}}>{error}</p>}
    <EventForm method={onFormSendHandler} errors={errorsList} />
  </>;
}