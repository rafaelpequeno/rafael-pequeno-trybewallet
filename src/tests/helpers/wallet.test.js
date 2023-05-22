import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';

describe('Testa a página carteira', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const valueInputName = 'value-input';
  const descriptionInputName = 'description-input';
  const methodInputName = 'method-input';
  const totalInputName = 'total-field';

  test('Testa os campos do formulário', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    screen.getByTestId(valueInputName);
    screen.getByTestId(descriptionInputName);
    screen.getByTestId('currency-input');
    screen.getByTestId(methodInputName);
    screen.getByTestId('tag-input');
    screen.getByRole('button', { name: /adicionar despesa/i });
    screen.getByTestId('header-currency-field');
    screen.getByTestId(totalInputName);
  });
  test('Testa o header da tabela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    screen.getByRole('columnheader', { name: /descrição/i });
    screen.getByRole('columnheader', { name: /tag/i });
    screen.getByRole('columnheader', { name: /método de pagamento/i });
    screen.getByRole('columnheader', { name: 'Valor' });
    screen.getByRole('columnheader', { name: 'Moeda' });
    screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    screen.getByRole('columnheader', { name: 'Valor convertido' });
    screen.getByRole('columnheader', { name: 'Moeda de conversão' });
    screen.getByRole('columnheader', { name: /editar\/excluir/i });
  });
  test('Testa os valores da tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId(valueInputName);
    const description = screen.getByTestId(descriptionInputName);
    const method = screen.getByTestId(methodInputName);
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.paste(value, '10');
    userEvent.type(description, 'Teste');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.click(button);

    await screen.findByRole('cell', { name: /teste/i });
    await screen.findByRole('cell', { name: /lazer/i });
    await screen.findByRole('cell', { name: /dinheiro/i });
    await screen.findByRole('cell', { name: /10\.00/i });
    await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    await screen.findByRole('cell', { name: /4\.75/i });
    await screen.findByRole('cell', { name: /47\.53/i });
    await screen.findByRole('cell', { name: 'Real' });
  });
  test('Testa os botões da tabela', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });
    const value = screen.getByTestId(valueInputName);
    const description = screen.getByTestId(descriptionInputName);
    const method = screen.getByTestId(methodInputName);
    const tag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.paste(value, '10');
    userEvent.type(description, 'Teste');
    userEvent.selectOptions(method, 'Dinheiro');
    userEvent.selectOptions(tag, 'Lazer');
    userEvent.click(button);

    const excluirBtn = await screen.findByRole('button', { name: /excluir/i });
    const editarBtn = await screen.findByRole('button', { name: /editar/i });

    expect(excluirBtn).toBeInTheDocument();
    expect(editarBtn).toBeInTheDocument();

    userEvent.click(editarBtn);

    const editExpenseBtn = await screen.findByRole('button', { name: /editar despesa/i });
    expect(editExpenseBtn).toBeInTheDocument();

    userEvent.clear(value);
    userEvent.type(value, '20');
    userEvent.click(editExpenseBtn);

    expect(screen.getByTestId(totalInputName)).toHaveTextContent('95.06');

    userEvent.click(excluirBtn);

    expect(screen.getByTestId(totalInputName)).toHaveTextContent('0.00');
  });
});
