import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";

import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";

export const Router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventsRoot />, children: [
        { index: true, element: <EventsPage /> },
        { path: 'new', element: <NewEventPage /> },
        { path: ':eventId', element: <EventDetailPage /> },
        { path: ':eventId/edit', element: <EditEventPage /> },
      ]}
    ]
  }
])