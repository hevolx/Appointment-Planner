import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TileList } from './TileList';

jest.mock('../tile/Tile', () => ({
  Tile: (props) => <div data-testid="tile" data-name={props.name} />
}));

it('renders a Tile for each item in the tiles array', () => {
  const tiles = [
    { name: 'Alice', phone: '555-1111', email: 'alice@example.com' },
    { name: 'Bob', phone: '555-2222', email: 'bob@example.com' }
  ];

  render(<TileList tiles={tiles} />);

  expect(screen.getAllByTestId('tile')).toHaveLength(2);
});
