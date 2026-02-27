import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactForm } from './ContactForm';

const noop = () => {};

it('renders controlled inputs for name, phone and email', () => {
  render(
    <ContactForm
      name="Alice"
      setName={noop}
      phone="555-1234"
      setPhone={noop}
      email="alice@example.com"
      setEmail={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('Alice');
  expect(screen.getByRole('textbox', { name: /phone/i })).toHaveValue('555-1234');
  expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue('alice@example.com');
});

it('renders a submit button', () => {
  render(
    <ContactForm
      name=""
      setName={noop}
      phone=""
      setPhone={noop}
      email=""
      setEmail={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
});

it('phone input has a pattern attribute', () => {
  render(
    <ContactForm
      name=""
      setName={noop}
      phone=""
      setPhone={noop}
      email=""
      setEmail={noop}
      handleSubmit={noop}
    />
  );

  const phoneInput = screen.getByRole('textbox', { name: /phone/i });
  expect(phoneInput).toHaveAttribute('pattern');
});

it('renders a form element', () => {
  render(
    <ContactForm
      name=""
      setName={noop}
      phone=""
      setPhone={noop}
      email=""
      setEmail={noop}
      handleSubmit={noop}
    />
  );

  expect(screen.getByRole('form')).toBeInTheDocument();
});
