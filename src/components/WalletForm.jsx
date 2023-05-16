import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input type="number" name="value" id="value" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currency">
          <select name="currency" id="currency" data-testid="currency-input">
            {currencies !== undefined && currencies.map((currancy) => (
              <option key={ currancy } value={ currancy }>{currancy}</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          <select name="payment" id="payment" data-testid="method-input">
            <option value="cash">Dinheiro</option>
            <option value="credit-card">Cartão de crédito</option>
            <option value="debit-card">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select name="tag" id="tag" data-testid="tag-input">
            <option value="feed">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="work">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="helth">Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

export default WalletForm;
