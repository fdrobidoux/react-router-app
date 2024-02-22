import { createBrowserRouter } from "react-router-dom"

import RootLayout from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";

import HomePage from "./pages/Home";
import EventsPage, {loader as eventsLoader} from "./pages/Events";
import EventDetailPage, {loader as eventDetailLoader, action as deleteEventAction} from "./pages/EventDetails";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import NewsletterPage, {action as newsletterAction} from "./pages/Newsletter";

import {action as eventFormAction} from "./components/EventForm";

export const Router = createBrowserRouter([
  { 
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'events', 
        element: <EventsRoot />, 
        children: [
          { 
            index: true, 
            element: <EventsPage />, 
            loader: eventsLoader
          },
          { path: 'new', element: <NewEventPage />, action: eventFormAction },
          { 
            path: ':eventId',
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              { 
                index: true, 
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              { path: 'edit', element: <EditEventPage />, action: eventFormAction }
            ]
          },
        ]
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction
      }
    ]
  }
])