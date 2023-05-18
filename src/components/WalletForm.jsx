import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, finishUpdate } from '../redux/actions';
import getCurrency from '../helpers/currencyAPI';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    currency: 'USD',
  };

  componentDidUpdate(prevProps) {
    const { idToEdit, editor, expenses } = this.props;
    const { id } = this.state;
    const index = expenses.findIndex((item) => item.id === idToEdit);
    if (editor && prevProps.editor !== editor) {
      this.setState({
        ...expenses[index],
        oldId: id,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleAddClick = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, method, tag, currency } = this.state;

    const exchangeData = await getCurrency();

    const data = {
      id,
      value,
      description,
      currency,
      method,
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

  handleEditClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { oldId } = this.state;
    const updateExpense = { ...this.state };
    delete updateExpense.oldId;
    dispatch(finishUpdate(updateExpense));
    this.setState({
      id: oldId,
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { description, method, tag, value, currency } = this.state;
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
        <label htmlFor="currency">
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies !== undefined && currencies.map((currancy) => (
              <option key={ currancy } value={ currancy }>{currancy}</option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
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
        {editor === false && (
          <button onClick={ this.handleAddClick }>Adicionar despesa</button>)}
        {editor === true && (
          <button onClick={ this.handleEditClick }>Editar despesa</button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.wallet });

WalletForm.propTypes = {
  currencies: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
