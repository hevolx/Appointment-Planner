import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactPicker } from './ContactPicker';

it('renders a default "No Contact Selected" option with empty value', () => {
  render(
    <ContactPicker
      contacts={[]}
      onChange={() => {}}
      value=""
      name="contact"
    />
  );

  const defaultOption = screen.getByRole('option', { name: /no contact selected/i });
  expect(defaultOption).toBeInTheDocument();
  expect(defaultOption).toHaveValue('');
});

it('renders an option for each contact', () => {
  const contacts = [
    { name: 'Alice', phone: '555-1111', email: 'alice@example.com' },
    { name: 'Bob', phone: '555-2222', email: 'bob@example.com' }
  ];

  render(
    <ContactPicker
      contacts={contacts}
      onChange={() => {}}
      value=""
      name="contact"
    />
  );

  expect(screen.getByRole('option', { name: 'Alice' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Bob' })).toBeInTheDocument();
});

it('renders a select element', () => {
  render(
    <ContactPicker
      contacts={[]}
      onChange={() => {}}
      value=""
      name="contact"
    />
  );

  expect(screen.getByRole('combobox')).toBeInTheDocument();
});
