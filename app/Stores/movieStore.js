
let movies = [];

const MovieStore = Object.assign({}, EventEmitter.prototype, {

  addChangeListener: function (event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function (event, callback) {
    this.removeListener(event, callback);
  },

  emitChange: function (event) {
    this.emit(event);
  },

  setMovies: function (data) {
    movies = data;
  },

  getMovies: function () {
    return movies.slice();
  },

  getMovie: function (title) {
    let movie;
    let idx = 0;

    while (!movie && idx < movies.length) {
      if (movies[idx].title === title) movie = movies[idx];
      idx++;
    }
    return movie;
  }

});

Dispatcher.register(payload => {
  switch(payload.actionType) {
    case ActionTypes.GET_MOVIES:
      console.log('get movie payload', payload);
      MovieStore.setMovies(payload.data)
      break;
    case ActionTypes.CREATE_MOVIE:
      console.log('create movie payload', payload);
      break;
    case ActionTypes.UPDATE_MOVIE:
      console.log('updated movie payload', payload);
      break;
    case ActionTypes.DELETE_MOVIE:
      break;
  }
  // alert components that the store has been updated
  MovieStore.emitChange(payload.actionType);
});
