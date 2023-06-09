import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { removeExpense, editExpense, idToEdit } from '../redux/actions';

class Table extends Component {
  handleAddButton = (id) => {
    const { expenses, dispatch } = this.props;
    const update = expenses.slice().filter((expense) => expense.id !== id);
    dispatch(removeExpense(update));
  };

  handleEditButton = (id) => {
    const { editor, dispatch } = this.props;
    dispatch(editExpense(!editor));
    dispatch(idToEdit(id));
  };

  render() {
    const { expenses, editor } = this.props;
    return (
      <div className="wallet-table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          {expenses !== undefined && expenses.map((expense) => (
            <tbody key={ expense.id }>
              <tr>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name.split('/', 1)}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {(expense.value * expense.exchangeRates[expense.currency].ask)
                    .toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  { !editor
                  && (
                    <FaTrashAlt
                      data-testid="delete-btn"
                      className="delete-btn"
                      onClick={ () => this.handleAddButton(expense.id) }
                    >
                      Excluir
                    </FaTrashAlt>)}
                  <FaEdit
                    data-testid="edit-btn"
                    className="edit-btn"
                    onClick={ () => this.handleEditButton(expense.id) }
                  >
                    Editar
                  </FaEdit>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
