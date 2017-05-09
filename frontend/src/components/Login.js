import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      login: '',
      password: '',
      loading: false,
      error: '',
    };
  }

  handleChangeLogin(event) {
    this.setState({ login: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  login(e) {
    e.preventDefault();
    this.setState({ loading: true });
    axios.post('http://localhost:3001/api/session', {
      login: this.state.login,
      password: this.state.password,
    })
    .then((response) => {
      this.props.login(response.data.login);
    })
    .catch((error) => {
      if (!error.response || error.response.status !== 401) {
        console.log(error);
        return this.setState({
          loading: false,
          error: 'Ooops something went wrong.',
        });
      }
      return this.setState({
        loading: false,
        error: 'Incorrect Login or Password.',
      });
    });
  }

  render() {
    if (this.props.user) {
      browserHistory.replace('/foo');
    }
    return (
      <div className="col-xs-12 col-md-6 col-md-offset-3">
        <h3>Log in to view protected content!</h3>
        <p>Hint: contact@qover.me / guest</p>
        {this.state.error ? <div className="alert alert-info">{this.state.error}</div> : ''}
        <form role="form">
        <div className="form-group">
            <input type="text"
              className="form-control input-lg"
              placeholder="Login"
              value={this.state.login}
              onChange={this.handleChangeLogin.bind(this)}
            />
          </div>
          <div className="form-group">
            <input type="password"
              className="form-control input-lg"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChangePassword.bind(this)}
            />
          </div>
          <button type="submit"
            className="btn btn-lg"
            disabled={this.state.loading}
            onClick={this.login.bind(this)}
          >
            {this.state.loading ? 'loading...' : 'submit' }
          </button>
      </form>
    </div>
    );
  }
}

export default Login;
