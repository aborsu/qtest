import { connect } from 'react-redux';
import { login } from '../actions';
import Login from '../components/Login';


const mapStateToProps = state => ({
  user: state.login,
  poney: 'pretty',
});

const mapDispatchToProps = dispatch => ({
  login: (user) => {
    dispatch(login(user));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginContainer;
