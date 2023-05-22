import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrancy } from '../redux/actions';
import Table from '../components/Table';
import './style/Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrancy());
  }

  render() {
    const { email, currencies, editor } = this.props;
    return (
      <div>
        <header>
          <Header email={ email } />
        </header>
        <div>
          <WalletForm currencies={ currencies } editor={ editor } />
        </div>
        <div>
          <Table />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

Wallet.propTypes = {
  email: PropTypes.string,
  requestCurrancy: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
