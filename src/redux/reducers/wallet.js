// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, REQUEST_CURRENCY_SUCCESS } from '../actions';

const INNITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
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
  default:
    return state;
  }
};

export default wallet;
