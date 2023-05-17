import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  handleSum = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;
      const exchangeRate = exchangeRates[currency].ask;
      const expenseTotal = value * exchangeRate;
      return acc + expenseTotal;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email, currency = 'BRL' } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">
          {this.handleSum()}
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
