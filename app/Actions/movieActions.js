MovieActions = {
  createMovie: function (movieParams) {
    superagent
      .post('/api/movies')
      .send(movieParams)
      .end(function (err, res) {
        if (err) return console.log(err);

        Dispatcher.dispatch({
          actionType: ActionTypes.CREATE_MOVIE,
          data: res.body.data
        });
      });
  },

  updateMovie: function (movieParams) {
    superagent
      .put('/api/movies')
      .send(movieParams)
      .end(function (err, res) {
        if (err) return console.log(err);

        Dispatcher.dispatch({
          actionType: ActionTypes.UPDATE_MOVIE,
          data: res.body.data
        });
      });
  },

  getMovies: function () {
    console.log('about to call get movies')
    superagent
      .get('/api/movies')
      .end(function (err, res) {
        if (err) return console.log(err);

        Dispatcher.dispatch({
          actionType: ActionTypes.GET_MOVIES,
          data: res.body.data
        });
      });
  },

  deleteMovie: function (title) {
    superagent
      .del('/api/movies')
      .query({title: title})
      .end(function (err, res) {
        if (err) return console.log(err);

        Dispatcher.dispatch({
          actionType: ActionTypes.DELETE_MOVIE,
          data: res.body.data
        });
      });
  }
}
