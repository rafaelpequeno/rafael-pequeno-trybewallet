import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchCurrancy } from '../redux/actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrancy());
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <Header email={ email } />
        <WalletForm currencies={ currencies } />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string,
  requestCurrancy: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
