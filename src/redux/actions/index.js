// Coloque aqui suas actions

import getCurrency from '../../helpers/currencyAPI';

export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';
export const REQUEST_CURRENCY_ERROR = 'REQUEST_CURRENCY_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const login = (value) => ({ type: LOGIN, value });

export const requestCurrancy = () => ({ type: REQUEST_CURRENCY });

export const requestCurrancySuccess = (currencies) => ({
  type: REQUEST_CURRENCY_SUCCESS,
  payload: currencies,
});

export const requestCurrancyError = () => ({ type: REQUEST_CURRENCY_ERROR });

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: expense,
});

export const fetchCurrancy = () => async (dispatch) => {
  dispatch(requestCurrancy());
  try {
    const currency = await getCurrency();
    const currencies = Object.keys(currency).filter((e) => e !== 'USDT');
    dispatch(requestCurrancySuccess(currencies));
  } catch (error) {
    dispatch(requestCurrancyError());
  }
};
