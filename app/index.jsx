const browserHistory = ReactRouter.browserHistory;

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    // browserHistory.push('/login');
  }

  render() {
    return <div>
      <Header/>
      {this.props.children}
    </div>
  }
}

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const router = <Router history={browserHistory}>
  <Route path='/login' component={LoginPage}/>
  <Route path='/' component={App}>
    <IndexRoute component={MoviePage}/>
    <Route path='/details/:title' component={MovieDetails}/>
    <Route path='/edit/:title' component={MovieEdit}/>
  </Route>
</Router>;

window.onload = function () {
  ReactDOM.render(router, document.getElementById('app'));
};
