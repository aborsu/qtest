import React, { Component } from 'react';
import { Link } from 'react-router';

class Layout extends Component {

  logout() {
    this.props.logout();
  }
  renderLogin() {
    return <ul className="nav navbar-nav navbar-right">
      <li>
      {this.props.user ?
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.logout.bind(this)}
        >
          Log out
        </button>
        :
        <Link to="/login">
          <button
            type="button"
            className="btn btn-default navbar-btn"
          >
            Sign in
          </button>
        </Link>
      }
      </li>
    </ul>;
  }

  render() {
    return <div>
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Q-test</Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/quotes">Quotes</Link></li>
              </ul>
              {this.renderLogin()}
            </div>
          </div>
        </nav>
      </header>
      <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
    </div>;
  }
}

export default Layout;
