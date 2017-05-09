import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Quote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      carMakes: [],
      carMake: '',
      carValue: '',
      driverName: '',
      error: '',
      quote: null,
    };
  }

  handleChange(value) {
    return (event) => {
      this.setState({ [value]: event.target.value });
    };
  }

  componentDidMount() {
    console.log('ICI')
    return axios.get('http://localhost:3001/api/carMakes')
      .then(response => this.setState({
        carMakes: response.data,
        carValue: response.data[0],
      }))
      .catch();
  }

  reset() {
    this.setState({
      carMake: this.state.carMakes[0],
      carValue: '',
      driverName: '',
      error: '',
      quote: null,
    });
  }

  submit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    axios({
      url: 'http://localhost:3001/api/quotes',
      method: 'post',
      withCredentials: true,
      data: {
        driverName: this.state.driverName,
        carMake: this.state.carMake,
        carValue: this.state.carValue,
        submitTime: Date.now(),
      },
    })
    .then(response => this.setState({ quote: response.data }))
    .catch((error) => {
      if (!error.response || error.response.status !== 401) {
        return this.setState({
          loading: false,
          error: 'Ooops something went wrong.',
        });
      }
      return browserHistory.replace('/login');
    });
  }

  render() {
    if (this.state.quote !== null) {
      const { status, price, msg } = this.state.quote;
      return (<div className="col-xs-12 col-md-6 col-md-offset-3">
        {status ?
          <p>Congratulations, your car can be insured for {price}€</p> :
          <p>Your car can unfortunately not be insured because {msg}</p>
        }
        <button
          type="button"
          className="btn btn-default navbar-btn"
          onClick={this.reset.bind(this)}
        >
          Go again!
        </button>
      </div>);
    }
    return (<div className="col-xs-12 col-md-6 col-md-offset-3">
      <h3>Get your quote in an INSTANT!</h3>
      {this.state.error ? <div className="alert alert-info">{this.state.error}</div> : ''}
      <form role="form">
        <div className="input-group">
          <input type="text"
            className="form-control input-lg"
            placeholder="Driver Name"
            value={this.state.driverName}
            onChange={this.handleChange('driverName').bind(this)}
          />
        </div>
        <div className="input-group">
          <select className="btn btn-default"
              value={this.state.carMake}
              onChange={this.handleChange('carMake').bind(this)}
          >
          {this.state.carMakes.map((make, i) =>
            <option key={i} value={make} >{make}</option>)}
          </select>
        </div>
        <div className="input-group">
          <input type="number"
            className="form-control input-lg"
            value={this.state.carValue}

            onChange={this.handleChange('carValue').bind(this)}
          />
        </div>

        <button type="submit"
          className="btn btn-lg"
          disabled={this.state.loading || (
            this.state.driverName === '' ||
            this.state.carValue === '')}
          onClick={this.submit.bind(this)}
        >
          {this.state.loading ? 'Calculating...' : 'GET PRICE' }
        </button>
    </form>
  </div>);
  }
}

export default Quote;
