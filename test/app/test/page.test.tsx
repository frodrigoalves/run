import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TestPage from '@/app/test/page';
import { httpsCallable } from 'firebase/functions';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => ['mocked-app']),
  getApp: jest.fn(() => ({}))
}));
jest.mock('firebase/analytics');
jest.mock('firebase/messaging');
jest.mock('firebase/functions');

describe('TestPage', () => {
  beforeEach(() => {
    (httpsCallable as jest.Mock).mockReturnValue(() =>
      Promise.resolve({ data: { text: 'mocked result' } })
    );
  });
  it('renders the heading', () => {
    render(<TestPage />);
    const heading = screen.getByRole('heading', {
      name: /test gemini function/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('calls the gemini function and displays the result', async () => {
    render(<TestPage />);

    const input = screen.getByPlaceholderText(/enter your prompt/i);
    fireEvent.change(input, { target: { value: 'test prompt' } });

    const button = screen.getByRole('button', { name: /call gemini/i });
    fireEvent.click(button);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    const resultText = await screen.findByText(/mocked result/i);
    expect(resultText).toBeInTheDocument();

    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  });
});
