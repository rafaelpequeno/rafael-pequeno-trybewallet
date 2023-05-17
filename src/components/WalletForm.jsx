import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense } from '../redux/actions';
import getCurrency from '../helpers/currencyAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    payment: 'Dinheiro',
    tag: 'Alimentação',
    selectedCurrancy: 'USD',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, payment, tag, selectedCurrancy } = this.state;

    const exchangeData = await getCurrency();

    const data = {
      id,
      value,
      description,
      currency: selectedCurrancy,
      method: payment,
      tag,
      exchangeRates: exchangeData,
    };

    dispatch(addExpense(data));

    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { description, payment, tag, value, selectedCurrancy } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="selectedCurrancy">
          <select
            name="selectedCurrancy"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ selectedCurrancy }
          >
            {currencies !== undefined && currencies.map((currancy) => (
              <option key={ currancy } value={ currancy }>{currancy}</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          <select
            name="payment"
            id="payment"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ payment }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button onClick={ this.handleClick }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

export default connect()(WalletForm);
