import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppointmentForm } from './AppointmentForm';

jest.mock('../contactPicker/ContactPicker', () => ({
  ContactPicker: (props) => (
    <div
      data-testid="contact-picker"
      data-contacts={JSON.stringify(props.contacts)}
    />
  )
}));

const noop = () => {};

it('renders controlled inputs for title, date and time', () => {
  render(
    <AppointmentForm
      contacts={[]}
      title="Checkup"
      setTitle={noop}
      contact=""
      setContact={noop}
      date="2026-03-01"
      setDate={noop}
      time="10:00"
      setTime={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('textbox', { name: /title/i })).toHaveValue('Checkup');
  expect(screen.getByLabelText(/date/i)).toHaveValue('2026-03-01');
  expect(screen.getByLabelText(/time/i)).toHaveValue('10:00');
});

it('renders a ContactPicker with the contacts list', () => {
  const contacts = [{ name: 'Alice', phone: '555-1111', email: 'alice@example.com' }];
  render(
    <AppointmentForm
      contacts={contacts}
      title=""
      setTitle={noop}
      contact=""
      setContact={noop}
      date=""
      setDate={noop}
      time=""
      setTime={noop}
      handleSubmit={noop}
    />
  );

  const picker = screen.getByTestId('contact-picker');
  expect(JSON.parse(picker.dataset.contacts)).toEqual(contacts);
});

it('renders a submit button', () => {
  render(
    <AppointmentForm
      contacts={[]}
      title=""
      setTitle={noop}
      contact=""
      setContact={noop}
      date=""
      setDate={noop}
      time=""
      setTime={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

it('sets today as the minimum date on the date input', () => {
  render(
    <AppointmentForm
      contacts={[]}
      title=""
      setTitle={noop}
      contact=""
      setContact={noop}
      date=""
      setDate={noop}
      time=""
      setTime={noop}
      handleSubmit={noop}
    />
  );

  const today = new Date().toLocaleDateString('en-US').split('/');
  const expectedMin = `${today[2]}-${today[0].padStart(2, '0')}-${today[1].padStart(2, '0')}`;

  expect(screen.getByLabelText(/date/i)).toHaveAttribute('min', expectedMin);
});

it('renders a form element', () => {
  render(
    <AppointmentForm
      contacts={[]}
      title=""
      setTitle={noop}
      contact=""
      setContact={noop}
      date=""
      setDate={noop}
      time=""
      setTime={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('form')).toBeInTheDocument();
});
