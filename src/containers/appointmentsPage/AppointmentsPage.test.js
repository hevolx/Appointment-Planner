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
  TileList: () => <div data-testid="tile-list" />
}));

it('renders an AppointmentForm', () => {
  render(<AppointmentsPage appointments={[]} contacts={[]} addAppointment={() => {}} />);

  expect(screen.getByTestId('appointment-form')).toBeInTheDocument();
});
