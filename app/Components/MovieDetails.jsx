class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.backToMainPage = this.backToMainPage.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.goToEditPage = this.goToEditPage.bind(this);
  }

  componentWillMount() {
    MovieStore.addChangeListener(ActionTypes.DELETE_MOVIE, this.backToMainPage);
  }

  backToMainPage() {
    ReactRouter.browserHistory.push('/');
  }

  goToEditPage() {
    ReactRouter.browserHistory.push('/edit/' + this.props.params.title);
  }

  deleteMovie() {
    MovieActions.deleteMovie(this.props.params.title);
  }

  render() {
    const movie = MovieStore.getMovie(this.props.params.title);

    return <div className="movie-details">
      <h2>{movie.title}</h2>
      <div className="detail-info">
        <div>Genre: {movie.genre}</div>
        <div>Rating: {movie.rating}</div>
        <div>Year: {movie.year}</div>
      </div>
      <div>
        <h3>Actors: </h3>
        {movie.actors.map( (actor, idx) => <div key={idx}>{actor}</div>)}
      </div>
      <div className="detail-buttons">
        <input type="button" onClick={this.backToMainPage} value="< BACK"/>
        <input type="button" onClick={this.goToEditPage} value="EDIT"/>
        <input type="button" onClick={this.deleteMovie} value="DELETE"/>
      </div>
    </div>
  }
}
