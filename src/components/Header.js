import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total = 0, currency = 'BRL' } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          Despesa Total:
          {' '}
          {total}
        </p>
        <p data-testid="header-currency-field">{currency}</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
  currency: PropTypes.string,
}.isRequired;

export default Header;
