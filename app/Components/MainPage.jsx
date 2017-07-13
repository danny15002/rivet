class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: []
    };

    this.getData = this.getData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.spawnModal = this.spawnModal.bind(this);
  }

  componentWillMount() {
    RivetStore.addChangeListener(ActionTypes.GET_DATA, this.updateData);
    this.getData();
  }

  componentWillUnount() {
    RivetStore.removeChangeListener(ActionTypes.GET_DATA, this.updateData);
  }

  getData() {
    RivetActions.getData();
  }

  updateData() {
    this.setState({
      pictures: RivetStore.getData()
    });
  }

  spawnModal(event) {
    console.log(event.target);
    const id = 'tempid';
    ReactRouter.browserHistory.push('/reviews/' + id);
  }

  render() {
    return <div onClick={this.spawnModal}>
      { this.state.pictures.map((pic, idx) =>
          <SmallPicture key={idx} pic={pic} />)}
    </div>;
  }
}
