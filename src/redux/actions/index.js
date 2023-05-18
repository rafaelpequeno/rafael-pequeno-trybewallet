// Coloque aqui suas actions

import getCurrency from '../../helpers/currencyAPI';

export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';
export const REQUEST_CURRENCY_ERROR = 'REQUEST_CURRENCY_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ID_TO_EDIT = 'ID_TO_EDIT';
export const FINISH_UPDATE = 'FINISH_UPDATE';

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

export const editExpense = (editor) => ({
  type: EDIT_EXPENSE,
  payload: editor,
});

export const idToEdit = (id) => ({
  type: ID_TO_EDIT,
  payload: id,
});

export const finishUpdate = (expense) => ({
  type: FINISH_UPDATE,
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
