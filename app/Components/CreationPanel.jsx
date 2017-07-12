class CreationPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      year: '',
      genre: '',
      rating: '',
      actors: []
    };

    this.createMovie = this.createMovie.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.addActor = this.addActor.bind(this);
    this.removeActor = this.removeActor.bind(this);
  }

  clearInputs() {
    this.setState({
      title: '',
      year: '',
      genre: '',
      rating: '',
      actors: [],
      error: ''
    })
  }

  createMovie(event) {
    event.preventDefault();

    this.setState({ error: ''});
    if (this.state.title === '') {
      this.setState({ error: 'Cannot make a movie without a title.'});
      return;
    }

    this.clearInputs();
    MovieActions.createMovie(this.state)
  }

  updateInput(event) {
    const id = event.target.id;
    const stateKey = id.split('-')[0];
    const newState = {};
    newState[stateKey] = event.target.value;
    this.setState(newState);
  }

  addActor() {
    const currentActor = (document.getElementById('actor-input')).value;
    if (currentActor === '') return;
    (document.getElementById('actor-input')).value = '';
    const actors = this.state.actors;
    actors.push(currentActor);
    this.setState({ actors: actors });
  }

  removeActor(idx) {
    return function () {
      const actors = this.state.actors;
      actors.splice(idx, 1);
      console.log(actors);
      this.setState({ actors: actors });
    }.bind(this)
  }

  render() {
    return <div className="creation-panel">
      <form onSubmit={this.createMovie}>
        <div>
          <input onChange={this.updateInput} id="title-input" placeholder="Title" value={this.state.title}/>
          <input onChange={this.updateInput} id="year-input" placeholder="Year Released" type="number" maxlength="4" value={this.state.year}/>
          <input onChange={this.updateInput} id="genre-input" placeholder="Genre" value={this.state.genre}/>
          <select onChange={this.updateInput} id="rating-input" value={this.state.rating}>
            <option selected disabled value="">Rating</option>
            <option>G</option>
            <option>PG</option>
            <option>PG-13</option>
            <option>R</option>
          </select>
          <input type="submit" value="Add Movie"/>
        </div>
        <div>
          <input id='actor-input' placeholder="Actor Name"/>
          <input type="button" value="Add Actor" onClick={this.addActor}/>
          <span className="error-div">{this.state.error}</span>
        </div>
        <div className="actor-list">
          {this.state.actors.map((actor, idx) => <div key={idx}>{actor}<span onClick={this.removeActor(idx)}>remove</span></div>)}
        </div>
      </form>
    </div>;
  }
}
