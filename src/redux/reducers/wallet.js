// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENCY,
  REQUEST_CURRENCY_SUCCESS,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  ID_TO_EDIT,
  FINISH_UPDATE,
} from '../actions';

const INNITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return {
      ...state,
    };
  case REQUEST_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.payload,
    };
  case ID_TO_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
    };
  case FINISH_UPDATE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.idToEdit) {
          return action.payload;
        }
        return expense;
      }),
      idToEdit: '',
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
