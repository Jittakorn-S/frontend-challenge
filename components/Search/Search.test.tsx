import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search Component', () => {
  it('calls onSearch with the input value when form is submitted', () => {
    const handleSearch = jest.fn();

    render(<Search onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/Search by city or ZIP code/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith('London');
  });
});