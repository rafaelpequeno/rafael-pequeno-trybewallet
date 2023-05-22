import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa a página de Login e o Header da página carteira', () => {
  test('Testa se o login tem o comportamento esperado', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });
    const login = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(login, 'teste@teste.com');
    userEvent.type(password, '123456');

    expect(button).not.toBeDisabled();

    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
    screen.getByText(/teste@teste\.com/i);
  });
});
