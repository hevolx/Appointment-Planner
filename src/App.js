import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom"
import Root, { ROUTES } from "./components/root/Root";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";
import { useState } from "react";

function App() {
  /*
  Define state variables for
  contacts and appointments
  */
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);



  /*
  Implement functions to add data to
  contacts and appointments
  */
  function addContact(name, phone, email) {
    const newObject = {
      name: name,
      phone: phone,
      email: email
    };
    return setContacts(prev => [...prev, newObject]);
  }

  function addAppointment(name, contact, date, time) {
    const newObject = {
      name: name,
      contact: contact,
      date: date,
      time: time
    };
    return setAppointments(prev => [...prev, newObject]);
  }

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={ <Root/> }>
      <Route index element={ <Navigate to={ROUTES.CONTACTS} replace/> }/>
      <Route path={ROUTES.CONTACTS} element={ <ContactsPage contacts={contacts} addContact={addContact}/> }/>
      <Route path={ROUTES.APPOINTMENTS} element={ <AppointmentsPage appointments={appointments} addAppointment={addAppointment} contacts={contacts} /> }/>
    </Route>
  ));


  return (
    <RouterProvider router={router}/>
  );
}

export default App;