import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ContactsPage } from './ContactsPage';

jest.mock('../../components/contactForm/ContactForm', () => ({
  ContactForm: (props) => (
    <div
      data-testid="contact-form"
      data-name={props.name}
      data-phone={props.phone}
      data-email={props.email}
      data-duplicate={String(props.duplicate)}
    >
      <button data-testid="set-name" onClick={() => props.setName('Bob')} />
      <button data-testid="submit" onClick={props.handleSubmit} />
    </div>
  )
}));

jest.mock('../../components/tileList/TileList', () => ({
  TileList: (props) => (
    <div data-testid="tile-list" data-tiles={JSON.stringify(props.tiles)} />
  )
}));

it('renders a ContactForm in the Add Contact section', () => {
  render(<ContactsPage contacts={[]} addContact={() => {}} />);

  expect(screen.getByTestId('contact-form')).toBeInTheDocument();
});

it('updates name in ContactForm when setName is called', async () => {
  render(<ContactsPage contacts={[]} addContact={() => {}} />);

  await userEvent.click(screen.getByTestId('set-name'));

  expect(screen.getByTestId('contact-form').dataset.name).toBe('Bob');
});

it('indicates a duplicate when the name matches an existing contact', async () => {
  const contacts = [{ name: 'Bob', phone: '555-0000', email: 'bob@example.com' }];
  render(<ContactsPage contacts={contacts} addContact={() => {}} />);

  await userEvent.click(screen.getByTestId('set-name'));

  expect(screen.getByTestId('contact-form').dataset.duplicate).toBe('true');
});

it('calls addContact on submit when name is not a duplicate', async () => {
  const addContact = jest.fn();
  render(<ContactsPage contacts={[]} addContact={addContact} />);

  await userEvent.click(screen.getByTestId('set-name'));
  await userEvent.click(screen.getByTestId('submit'));

  expect(addContact).toHaveBeenCalledWith('Bob', '', '');
});

it('does not call addContact on submit when name is a duplicate', async () => {
  const addContact = jest.fn();
  const contacts = [{ name: 'Bob', phone: '555-0000', email: 'bob@example.com' }];
  render(<ContactsPage contacts={contacts} addContact={addContact} />);

  await userEvent.click(screen.getByTestId('set-name'));
  await userEvent.click(screen.getByTestId('submit'));

  expect(addContact).not.toHaveBeenCalled();
});

it('clears the form after a successful submission', async () => {
  render(<ContactsPage contacts={[]} addContact={() => {}} />);

  await userEvent.click(screen.getByTestId('set-name'));
  await userEvent.click(screen.getByTestId('submit'));

  const form = screen.getByTestId('contact-form');
  expect(form.dataset.name).toBe('');
  expect(form.dataset.phone).toBe('');
  expect(form.dataset.email).toBe('');
});

it('passes the contacts array to TileList', () => {
  const contacts = [{ name: 'Alice', phone: '555-1111', email: 'alice@example.com' }];
  render(<ContactsPage contacts={contacts} addContact={() => {}} />);

  const tileList = screen.getByTestId('tile-list');
  expect(JSON.parse(tileList.dataset.tiles)).toEqual(contacts);
});

it('passes empty initial state values to ContactForm', () => {
  render(<ContactsPage contacts={[]} addContact={() => {}} />);

  const form = screen.getByTestId('contact-form');
  expect(form.dataset.name).toBe('');
  expect(form.dataset.phone).toBe('');
  expect(form.dataset.email).toBe('');
});
