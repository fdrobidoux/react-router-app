import { useActionData, useNavigate, useNavigation, Form, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';
import { BASE_URL } from '../http';

function EventForm({ method, event=null }) {
  const data = useActionData();
  const [_event] = useState(event || {
    title: '',
    image: 'https://via.placeholder.com/300x300',
    date: new Date().toISOString().substring(0, 10),
    description: ''
  });

  const navigate = useNavigate();
  const navigation = useNavigation();

  function cancelHandler() {
    navigate('..', { relative: 'path' });
  }

  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && <ul>
        {Object.values(data.errors).map((err, i) => (
          <li key={i}>{err}</li>
        ))}
      </ul>}
      <p>
        {data && data.errors && data.errors.title && <span className="error">{data.errors.title}</span>}
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={_event.title} required />
      </p>
      <p>
        {data && data.errors && data.errors.image && <span className="error">{data.errors.image}</span>}
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={_event.image} required />
      </p>
      <p>
        {data && data.errors && data.errors.date && <span className="error">{data.errors.date}</span>}
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={_event.date} required />
      </p>
      <p>
        {data && data.errors && data.errors.description && <span className="error">{data.errors.description}</span>}
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows="5" 
          defaultValue={_event.description} 
          required 
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>Cancel</button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  };

  let url = `${BASE_URL}/events`;
  if (request.method === "PATCH") {
    url += "/" + params.eventId;
  }

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw json({message: "Could not send the data"}, {
      status: 500
    });
  }

  return redirect('/events');
}