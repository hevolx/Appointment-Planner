import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

jest.mock('./containers/contactsPage/ContactsPage', () => ({
  ContactsPage: (props) => (
    <div
      data-testid="contacts-page"
      data-contacts={JSON.stringify(props.contacts)}
    >
      <button
        data-testid="add-contact"
        onClick={() => props.addContact('Alice', '555-1234', 'alice@example.com')}
      />
    </div>
  )
}));

jest.mock('./containers/appointmentsPage/AppointmentsPage', () => ({
  AppointmentsPage: (props) => (
    <div
      data-testid="appointments-page"
      data-appointments={JSON.stringify(props.appointments)}
      data-contacts={JSON.stringify(props.contacts)}
    >
      <button
        data-testid="add-appointment"
        onClick={() => props.addAppointment('Checkup', 'Alice', '2026-03-01', '10:00')}
      />
    </div>
  )
}));

beforeEach(() => {
  window.history.pushState({}, '', '/');
});

it('passes an initial empty contacts array to ContactsPage', () => {
  render(<App />);

  const page = screen.getByTestId('contacts-page');
  expect(JSON.parse(page.dataset.contacts)).toEqual([]);
});

it('adds a new appointment when addAppointment is called', async () => {
  render(<App />);

  await userEvent.click(screen.getByText('Appointments'));
  await userEvent.click(screen.getByTestId('add-appointment'));

  const page = screen.getByTestId('appointments-page');
  expect(JSON.parse(page.dataset.appointments)).toEqual([
    { name: 'Checkup', contact: 'Alice', date: '2026-03-01', time: '10:00' }
  ]);
});

it('passes contacts array to AppointmentsPage', async () => {
  render(<App />);

  await userEvent.click(screen.getByText('Appointments'));

  const page = screen.getByTestId('appointments-page');
  expect(JSON.parse(page.dataset.contacts)).toEqual([]);
});

it('adds a new contact when addContact is called', async () => {
  render(<App />);

  await userEvent.click(screen.getByTestId('add-contact'));

  const page = screen.getByTestId('contacts-page');
  expect(JSON.parse(page.dataset.contacts)).toEqual([
    { name: 'Alice', phone: '555-1234', email: 'alice@example.com' }
  ]);
});
