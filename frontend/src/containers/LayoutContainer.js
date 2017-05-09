import { connect } from 'react-redux';
import { logout } from '../actions';
import Layout from '../components/Layout';


const mapStateToProps = state => ({
  user: state.login,
  poney: 'pretty',
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
});

const LayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);

export default LayoutContainer;
