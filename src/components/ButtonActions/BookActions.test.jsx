import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import BookActions from './BookActions';
import { api } from '../../store/api/api.slice';

// Mock the Redux store
const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: () => ({ user: { uid: 'testUser' } }),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Mock the API hooks
vi.mock('../../store/api/api.slice', async () => {
  const actual = await vi.importActual('../../store/api/api.slice');
  return {
    ...actual,
    useAddUserBookMutation: () => [vi.fn(), { isLoading: false }],
    useDeleteBookMutation: () => {
      const deleteFn = vi.fn().mockResolvedValue({ data: {} });
      return [deleteFn, { isLoading: false, isSuccess: true }];
    },
    useUpdateBookMutation: () => [vi.fn(), { isLoading: false }],
  };
});

describe('BookActions', () => {
  const mockBook = {
    bid: 'testBid',
    title: 'Test Book',
    author: 'Test Author',
  };

  const mockOnBookDeleted = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <BookActions
            bid={mockBook.bid}
            book={mockBook}
            onBookDeleted={mockOnBookDeleted}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders all buttons', () => {
    expect(screen.getByText('Add to my library')).toBeDefined();
    expect(screen.getByText('Update book')).toBeDefined();
    expect(screen.getByText('Delete book')).toBeDefined();
    expect(screen.getByText('Back to book list')).toBeDefined();
  });

  it('opens update dialog when "Update book" is clicked', async () => {
    fireEvent.click(screen.getByText('Update book'));
    await waitFor(() => {
      expect(screen.getByText('Update Book')).toBeDefined();
    });
  });

 it('calls onBookDeleted when book is successfully deleted', async () => {
   const deleteButton = screen.getByText('Delete book');
   fireEvent.click(deleteButton);
   await waitFor(() => {
     expect(mockOnBookDeleted).toHaveBeenCalled();
   });
 });
});
