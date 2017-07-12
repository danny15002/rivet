class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signingUp: false,
      username: '',
      password: '',
      passwordCheck: ''
    };

    this.signUpMode = this.signUpMode.bind(this);
  }

  signUpMode() {
    this.setState({ signingUp: true });
  }

  signUp() {

  }

  logIn() {
    console.log('logging in')
    browserHistory.push('/')
  }

  render() {
    const buttonText = this.state.signingUp ? 'Sign Up' : 'Log In';
    const onClick = this.state.signingUp ? this.signUp : this.logIn;

    return <div>
      <div><h1>My Movies!</h1></div>
      <div>Login, or <span onClick={this.signUpMode}>Sign Up</span></div>
      <form>
        <input placeholder="Username" onChange={this.handleInput} value={this.state.username}/>
        <input placeholder="Password" onChange={this.handleInput} value={this.state.password}/>
        {this.state.signingUp ? <input placeholder="Password" onChange={this.handleInput} value={this.state.passwordCheck}/> : ''}
        <input type="button" value={buttonText} onClick={onClick}/>
      </form>
    </div>
  }
}
