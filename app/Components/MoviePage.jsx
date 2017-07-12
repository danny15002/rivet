class MoviePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      filteredMovies: []
    }

    this.getMovies = this.getMovies.bind(this);
    this.updateMovieList = this.updateMovieList.bind(this);
    this.filter = this.filter.bind(this);
  }

  componentWillMount() {
    MovieStore.addChangeListener(ActionTypes.CREATE_MOVIE, this.getMovies);
    MovieStore.addChangeListener(ActionTypes.GET_MOVIES, this.updateMovieList);
    this.getMovies();
  }

  componentWillUnount() {
    MovieStore.removeChangeListener(ActionTypes.CREATE_MOVIE, this.getMovies);
    MovieStore.removeChangeListener(ActionTypes.GET_MOVIES, this.updateMovieList);
  }

  getMovies() {
    MovieActions.getMovies();
  }

  updateMovieList() {
    this.setState({
      movies: MovieStore.getMovies(),
      filteredMovies: MovieStore.getMovies()
    });
  }

  filter(key, value) {
    let filteredMovies = [];
    if (key === null) {
      filteredMovies = this.state.movies;
    } else if (Number(value) === Number(value)) {
      filteredMovies = this.state.movies.filter( movie => movie[key] === Number(value) );
    } else if (key === 'actors') {
      filteredMovies = this.state.movies.filter( movie => movie[key].indexOf(value) > -1 );
    } else {
      filteredMovies = this.state.movies.filter( movie => movie[key] === value );
    }

    this.setState({ filteredMovies: filteredMovies });
  }

  render() {
    return <div>
      <div className="movie-page">
        <SearchBar filter={this.filter}/>
        <MovieList movies={this.state.filteredMovies}/>
        <CreationPanel/>
      </div>
    </div>
  }
}
