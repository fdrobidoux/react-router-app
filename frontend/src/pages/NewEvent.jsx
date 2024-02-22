import { useState } from "react";
import { useNavigate, json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";
import { BASE_URL, createEvent } from "../http";

export default function NewEventPage() {
  return <>
    <h1>Create a new event</h1>
    <EventForm method="post" />
  </>;
}