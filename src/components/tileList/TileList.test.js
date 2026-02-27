import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TileList } from './TileList';

jest.mock('../tile/Tile', () => ({
  Tile: (props) => (
    <div
      data-testid="tile"
      data-name={props.name}
      data-description={JSON.stringify(props.description)}
    />
  )
}));

it('renders a Tile for each item in the tiles array', () => {
  const tiles = [
    { name: 'Alice', phone: '555-1111', email: 'alice@example.com' },
    { name: 'Bob', phone: '555-2222', email: 'bob@example.com' }
  ];

  render(<TileList tiles={tiles} />);

  expect(screen.getAllByTestId('tile')).toHaveLength(2);
});

it('passes name and description props to each Tile', () => {
  const tiles = [{ name: 'Alice', phone: '555-1111', email: 'alice@example.com' }];

  render(<TileList tiles={tiles} />);

  const tile = screen.getByTestId('tile');
  expect(tile.dataset.name).toBe('Alice');
  expect(JSON.parse(tile.dataset.description)).toEqual(tiles[0]);
});
