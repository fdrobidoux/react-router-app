const BASE_URL = "http://localhost:8080"
const JSON_HEADERS = ['Content-Type', 'application/json; charset=utf-8'];

async function errorHandler(response, defaultMessage, specialCase=null) {
  if (!response.ok) {
    var message = defaultMessage;
    if (response.headers.get('Content-Type').includes("json")) {
      const json = await response.json();
      throw json;
    }
    throw message;
  }
}

export async function getEvents() {
  const response = await fetch(`${BASE_URL}/events`, { method: 'GET' });
  await errorHandler(response, "Unknown error fetching events.");
  const json = await response.json();
  return json.events;
}

export async function getEventById(id) {
  const response = await fetch(`${BASE_URL}/events/${id}`, { method: 'GET' });
  await errorHandler(response, `Unknown error fetching event with ID ${id}.`);
  const json = await response.json();
  return json.event;
}

/**
 * @param {EventData} eventData 
 * @returns {Promise<Response>}
 */
export async function createEvent(eventData) {
  const response = await fetch(`${BASE_URL}/events`, {
    method: 'POST',
    headers: [ JSON_HEADERS ],
    body: JSON.stringify(eventData)
  });
  await errorHandler(response, "Unknown error creating event.");
  return response;
}

/**
 * @param {EventData} eventData 
 * @returns {Promise<Response>}
 */
export async function updateEvent(eventData) {
  const response = await fetch(`${BASE_URL}/events/${eventData.id}`, {
    method: 'PATCH',
    headers: [ JSON_HEADERS ],
    body: JSON.stringify(eventData)
  });
  await errorHandler(response, "Unknown error updating event.");
  return response;
}

/**
 * @param {EventData} eventData 
 * @returns {Promise<Response>}
 */
export async function deleteEvent(eventId) {
  const response = await fetch(`${BASE_URL}/events/${eventId}`, { method: 'DELETE' });
  await errorHandler(response, "Unknown error deleting event.");
  return response;
}