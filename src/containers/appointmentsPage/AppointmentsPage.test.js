import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { AppointmentsPage } from './AppointmentsPage';

jest.mock('../../components/appointmentForm/AppointmentForm', () => ({
  AppointmentForm: (props) => (
    <div
      data-testid="appointment-form"
      data-title={props.title}
      data-contact={props.contact}
      data-date={props.date}
      data-time={props.time}
    >
      <button data-testid="set-title" onClick={() => props.setTitle('Checkup')} />
      <button data-testid="submit" onClick={props.handleSubmit} />
    </div>
  )
}));

jest.mock('../../components/tileList/TileList', () => ({
  TileList: (props) => (
    <div data-testid="tile-list" data-tiles={JSON.stringify(props.tiles)} />
  )
}));

it('passes the appointments array to TileList', () => {
  const appointments = [{ name: 'Checkup', contact: 'Alice', date: '2026-03-01', time: '10:00' }];
  render(<AppointmentsPage appointments={appointments} contacts={[]} addAppointment={() => {}} />);

  const tileList = screen.getByTestId('tile-list');
  expect(JSON.parse(tileList.dataset.tiles)).toEqual(appointments);
});

it('renders an AppointmentForm', () => {
  render(<AppointmentsPage appointments={[]} contacts={[]} addAppointment={() => {}} />);

  expect(screen.getByTestId('appointment-form')).toBeInTheDocument();
});

it('clears the form after submission', async () => {
  render(<AppointmentsPage appointments={[]} contacts={[]} addAppointment={() => {}} />);

  await userEvent.click(screen.getByTestId('set-title'));
  await userEvent.click(screen.getByTestId('submit'));

  expect(screen.getByTestId('appointment-form').dataset.title).toBe('');
});

it('calls addAppointment with form values on submit', async () => {
  const addAppointment = jest.fn();
  render(<AppointmentsPage appointments={[]} contacts={[]} addAppointment={addAppointment} />);

  await userEvent.click(screen.getByTestId('set-title'));
  await userEvent.click(screen.getByTestId('submit'));

  expect(addAppointment).toHaveBeenCalledWith('Checkup', '', '', '');
});
