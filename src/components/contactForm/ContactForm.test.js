import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactForm } from './ContactForm';

const noop = () => {};

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
