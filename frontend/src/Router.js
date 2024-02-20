import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";

import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import { BASE_URL, errorHandler as whenErrorLoading } from "./http";

export const Router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventsRoot />, children: [
        { 
          index: true, 
          element: <EventsPage />, 
          loader: async () => {
            const response = await fetch(`${BASE_URL}/events`);
            if (!response.ok) {
              whenErrorLoading(response, "Unknown error fetching events.");
            } else {
              const resData = await response.json();
              return resData.events;
            }
          } 
        },
        { path: 'new', element: <NewEventPage /> },
        { path: ':eventId', element: <EventDetailPage /> },
        { path: ':eventId/edit', element: <EditEventPage /> },
      ]}
    ]
  }
])