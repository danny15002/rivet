class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.goToMovieDetails = this.goToMovieDetails.bind(this);
  }

  goToMovieDetails(event) {
    const title = event.target.title;
    if (!title) return;
    ReactRouter.browserHistory.push('/details/' + title)
  }

  render() {
    // NOTE: will have to click to see details/actors
    let headings = '';
    if (this.props.movies.length > 0) {
      headings = <tr className='table-header'>
        <th>Title</th>
        <th>Year</th>
        <th>Genre</th>
        <th>Rating</th>
      </tr>
    }

    return <div className="movie-list">
      <table onClick={this.goToMovieDetails}>
        {headings}
        {this.props.movies.map( (movie, idx) => {
          return <tr key={idx} title={movie.title}>
            <td title={movie.title}>{movie.title}</td>
            <td title={movie.title}>{movie.year}</td>
            <td title={movie.title}>{movie.genre}</td>
            <td title={movie.title}>{movie.rating}</td>
          </tr>
        })}
      </table>
    </div>;
  }
}
