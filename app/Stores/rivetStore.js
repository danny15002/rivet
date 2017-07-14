
let pictures = [];

const RivetStore = Object.assign({}, EventEmitter.prototype, {

  addChangeListener: function (event, callback) {
    this.on(event, callback);
  },

  removeChangeListener: function (event, callback) {
    this.removeListener(event, callback);
  },

  emitChange: function (event) {
    this.emit(event);
  },

  setPictures: function (data) {
    pictures = data;
  },

  getData: function () {
    return pictures;
  }

});

Dispatcher.register(payload => {
  switch(payload.actionType) {
    case ActionTypes.GET_DATA:
      console.log('get movie payload', payload);
      RivetStore.setPictures(payload.data);
      break;
    default:
      console.log('SWITCH DEFAULT CASE');
  }
  // alert components that the store has been updated
  RivetStore.emitChange(payload.actionType);
});
