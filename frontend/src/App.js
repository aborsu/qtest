import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import asyncComponent from './components/asyncComponent';

const Foo = asyncComponent(() => import('./components/Foo').then(module => module.default), { name: 'Foo' });
const Bar = asyncComponent(() => import('./components/Bar').then(module => module.default), { name: 'Bar' });
const Home = asyncComponent(() => import('./components/Home').then(module => module.default), { name: 'Home' });

// class Session


const App = () => (
  <Router>
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Brand</Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li><Link to="/foo">Foo</Link></li>
              <li><Link to="/bar">Bar</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <Link to="/">
                <button type="button" className="btn btn-default navbar-btn">Sign in</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
      <Route exact path="/" component={Home} />
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
    </div>
  </Router>
);

export default App;
