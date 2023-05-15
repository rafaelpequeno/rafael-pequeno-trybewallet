// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INNITIAL_STATE = {
  user: {
    email: '',
  },
};

const user = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return action.value;
  default:
    return state;
  }
};

export default user;
