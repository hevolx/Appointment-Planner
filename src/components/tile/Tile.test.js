import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tile } from './Tile';

const description = { phone: '555-1111', email: 'alice@example.com' };

it('renders the name in a p element with class tile-title', () => {
  render(<Tile name="Alice" description={description} />);

  const title = screen.getByText('Alice');
  expect(title.tagName).toBe('P');
  expect(title).toHaveClass('tile-title');
});

it('renders a p with class tile for each value in description', () => {
  render(<Tile name="Alice" description={description} />);

  const tiles = screen.getAllByRole('paragraph');
  const tileItems = tiles.filter(p => p.classList.contains('tile'));
  expect(tileItems).toHaveLength(Object.values(description).length);
  expect(tileItems[0]).toHaveTextContent('555-1111');
  expect(tileItems[1]).toHaveTextContent('alice@example.com');
});
