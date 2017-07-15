class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: []
    };

    this.getData = this.getData.bind(this);
    this.updateData = this.updateData.bind(this);
    this.spawnModal = this.spawnModal.bind(this);
    this.render = this.render.bind(this);
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
    if (!event.target.dataset.index) return;
    const id = 'tempid';
    ReactRouter.browserHistory.push('/reviews/' + event.target.dataset.index);
  }

  render() {
    if (this.props.children) {
      const childrenWithProps = React.cloneElement(this.props.children, {
        pictures: this.state.pictures
      });
      return <div onClick={this.spawnModal}>
        { this.state.pictures.map((pic, idx) =>
            <SmallPicture key={idx} pic={pic} index={idx}/>)}
        { childrenWithProps }
      </div>;
    }

    return <div onClick={this.spawnModal}>
      { this.state.pictures.map((pic, idx) =>
          <SmallPicture key={idx} pic={pic} index={idx}/>)}
    </div>;
  };
}
