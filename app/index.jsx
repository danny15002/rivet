const browserHistory = ReactRouter.browserHistory;

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      {this.props.children}
    </div>
  }
}

const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;

const router = <Router history={browserHistory}>
  <Route path='/' component={App}>
    <IndexRoute component={ContentDisplay}/>
  </Route>
</Router>;

window.onload = function () {
  ReactDOM.render(router, document.getElementById('app'));
};
