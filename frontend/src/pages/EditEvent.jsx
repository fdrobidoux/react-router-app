import { useState } from "react";
import { useParams, useNavigate, useRouteLoaderData } from 'react-router-dom';
import EventForm from "../components/EventForm";
import { getEventById, updateEvent } from "../http";
import { useFetch } from "../hooks/useFetch";

export default function EditEventPage() {
  const data = useRouteLoaderData('event-details');
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [errorsList, setErrorsList] = useState({});

  async function onFormSendHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const eventData = {
      ...Object.fromEntries(fd.entries()),
      id: data.event.id,
    };
    try {
      await updateEvent(eventData).then(() => {
        navigate('/events');
      });
    } catch (e) {
      setError(e.message);
      setErrorsList(e.errors);
    }
  }

  return <>
    <h1>Edit an event</h1>
    <EventForm method="patch" event={data.event}/>
  </>;
}