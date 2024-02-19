import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

import { deleteEvent } from '../http';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const [error, setError] = useState();
  const params = useParams();
  const navigate = useNavigate();
  function startDeleteHandler() {
    deleteEvent(event.id).then(() => {
      navigate("/events");
    }).catch(e => {
      setError(e);
    });
  }

  return (
    <article className={classes.event}>
      {error && <p>{error.message}</p>}
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="./edit" relative="path">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
