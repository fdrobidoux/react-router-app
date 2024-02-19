import { useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';

function EventForm({ method, errors, event=null }) {
  const [_event] = useState(event || {
    title: '',
    image: 'https://via.placeholder.com/300x300',
    date: new Date().toISOString().substring(0, 10),
    description: ''
  });

  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..', { relative: 'path' });
  }

  return (
    <form className={classes.form} onSubmit={method}>
      <p>
        {errors && errors.title && <span className="error">{errors.title}</span>}
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={_event.title} required />
      </p>
      <p>
        {errors && errors.image && <span className="error">{errors.image}</span>}
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={_event.image} required />
      </p>
      <p>
        {errors && errors.date && <span className="error">{errors.date}</span>}
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={_event.date} required />
      </p>
      <p>
        {errors && errors.description && <span className="error">{errors.description}</span>}
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
        <button>Save</button>
      </div>
    </form>
  );
}

export default EventForm;
