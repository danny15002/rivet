RivetActions = {
  getData: function () {
    console.log('about to call TO get pictures');
    superagent
      .get('/get-data')
      .end(function (err, res) {
        if (err) return console.log(err);

        Dispatcher.dispatch({
          actionType: ActionTypes.GET_DATA,
          data: res.body.data
        });
      });
  }
};
