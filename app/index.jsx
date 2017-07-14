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
  <Route path='/' component={MainPage}>
    <Route path='reviews/:picId' component={Modal}/>
  </Route>
</Router>;

window.onload = function () {
  ReactDOM.render(router, document.getElementById('app'));
};
