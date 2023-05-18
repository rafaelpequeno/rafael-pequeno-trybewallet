import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testa a aplicação', () => {
  test('Testa a página Login', () => {
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
  });
  test('Testa a página carteira', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currancy = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    const currancyField = screen.getByTestId('header-currency-field');
    const totalField = screen.getByTestId('total-field');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currancy).toBeInTheDocument();
    expect(method).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(currancyField).toBeInTheDocument();
    expect(totalField).toBeInTheDocument();
  });
});
