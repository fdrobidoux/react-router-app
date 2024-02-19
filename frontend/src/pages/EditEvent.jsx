import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from "../components/EventForm";
import { getEventById, updateEvent } from "../http";
import { useFetch } from "../hooks/useFetch";

export default function EditEventPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { 
    isFetching, 
    error: fetchError, 
    fetchedData: event 
  } = useFetch(getEventById, {}, params.eventId);

  const [error, setError] = useState(null);
  const [errorsList, setErrorsList] = useState({});

  async function onFormSendHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const eventData = {
      ...Object.fromEntries(fd.entries()),
      id: event.id,
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
    {error && <p style={{color: 'red'}}>{error}</p>}
    {!isFetching && <EventForm method={onFormSendHandler} event={event} errors={errorsList} />}
  </>;
}