import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../redux/actions';
import './style/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    enterBTN: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  };

  buttonValidation = () => {
    const { email, password } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const maxLength = 6;
    const valPassword = password.length >= maxLength;
    this.setState({ enterBTN: (valPassword && regex.test(email)) });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(login({ email }));
    history.push('/carteira');
  };

  render() {
    const { email, password, enterBTN } = this.state;
    return (
      <div className="login">
        <div className="login-container">
          <form>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                data-testid="email-input"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                data-testid="password-input"
                value={ password }
                onChange={ this.handleChange }
              />
            </label>
            <button disabled={ !enterBTN } onClick={ this.handleLogin }>Entrar</button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
