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
import UserBookActions from './UserBookActions';
import { api } from '../../store/api/api.slice';

// Mock the Redux store
const mockStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Mock the API hooks
vi.mock('../../store/api/api.slice', async () => {
  const actual = await vi.importActual('../../store/api/api.slice');
  return {
    ...actual,
    useUpdateUserBookMutation: () => [vi.fn(), { isLoading: false }],
    useDeleteUserBookMutation: () => {
      const deleteFn = vi.fn().mockResolvedValue({ data: {} });
      deleteFn.unwrap = vi.fn().mockResolvedValue({ data: {} });
      return [deleteFn, { isLoading: false }];
    },
  };
});

describe('UserBookActions', () => {
  const mockUserBook = {
    ubid: 'testUbid',
    title: 'Test User Book',
    author: 'Test Author',
  };

  const mockOnUserBookDeleted = vi.fn();

  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <UserBookActions
            ubid={mockUserBook.ubid}
            userBook={mockUserBook}
            onUserBookDeleted={mockOnUserBookDeleted}
          />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders all buttons', () => {
    expect(screen.getByText('Update user book')).toBeDefined();
    expect(screen.getByText('Remove from library')).toBeDefined();
    expect(screen.getByText('Back to my library')).toBeDefined();
  });

  it('opens update dialog when "Update user book" is clicked', async () => {
    fireEvent.click(screen.getByText('Update user book'));
    await waitFor(() => {
      expect(screen.getByText('Update User Book')).toBeDefined();
    });
  });

  it('calls onUserBookDeleted when book is successfully deleted', async () => {
    const deleteButton = screen.getByText('Remove from library');
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(mockOnUserBookDeleted).toHaveBeenCalled();
    });
  });
});
