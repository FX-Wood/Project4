import React, { Component } from 'react';
import './App.css';
import SignupFlow from './views/SignupFlow';
import Login from './Login';
import UserProfile from './UserProfile';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import Splash from './views/Splash'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      message: '',
      lockedResult: '',
      login: false,
      signup: false
    }
    this.handleButton = this.handleButton.bind(this)
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.liftMessageToState = this.liftMessageToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleButton(button) {
    console.log('handling button ', button)
    switch(button) {
      case 'signup':
        this.setState({
            signup: true,
            login: false
        })
        break;
      case 'login':
        this.setState({
            login: true,
            signup: false,
        })
        break;
    }
  }

  liftTokenToState({token, user, message}) {
    console.log('[App.jsx]: lifting token to state', {token, user, message})
    this.setState({token, user, message})
  }

  liftMessageToState({ message }) {
    console.log('[App.jsx]: lifting error to state', { message })
    this.setState({ message })
  }

  logout() {
    console.log('[App.jsx] logout(): logging out', {localStorage: localStorage})
    // Remove the token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null
    })
  }

  handleClick(e) {
    console.log('[App.jsx]: handleClick(), event', {e})
    console.log('[App.jsx]: handleClick(), this.state', this.state)
    e.preventDefault()
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
    axios.get('/locked/test').then( res => {
      console.log('this is the locked response', res)
      this.setState({
        lockedResult: res.data.message
      })
    }).catch(err => {
      console.log('err')
    })
  }

  checkForLocalToken() {
    console.log('[App.jsx]: checkForLocalToken(), localStorage["jwtToken"]', localStorage["jwtToken"])
    let token = localStorage.getItem('jwtToken')
    if (!token || token === 'undefined') {
      // If there is no token, remove the entry in localStorage
      localStorage.removeItem('jwtToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // If found, send token to be verified
      axios.post('/auth/me/from/token',{token})
      .then( res => {
        if (res.data.type === 'error') {
          console.log('there was an older token sir, and it didn\'t check out', res.data)
          // if error, remove the bad token and display an error
          localStorage.removeItem('jwtToken')
          this.setState({
            errorMessage: res.data.message
          })
        } else {
          // Upon receipt, store token 
          localStorage.setItem('jwtToken', res.data.token)
          // Put token in state
          this.setState({
            token: res.data.token,
            user: res.data.user
          })
        }
        console.log(res)
      }).catch( err => {
        console.log(err)
      })
    }
  }

  componentDidMount() {
    console.log('[App.jsx]: componentDidMount(), this.state', JSON.stringify(this.state) )
    this.checkForLocalToken()
  }

  render() {
    let user = this.state.user
    const authProps = {
      toggleForm: this.handleButton,
      liftToken: this.liftTokenToState,
      liftMessage: this.liftMessageToState
    }
    return (
      <Router>
        <Switch>
          <Route 
            exact path='/'
            render={() => <Splash user={user} />} />
          <Route 
            path="/signup" 
            render={() => <SignupFlow {...authProps} />} />
          <Route 
            exact path="/login" 
            render={() => <Login {...authProps}/>} />
        </Switch>
      </Router>
    )
  }
}

export default App;
