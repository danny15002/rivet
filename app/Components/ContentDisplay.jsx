class ContentDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div className="content-display">
      Content Display
      <BigPicture className="big-picture"/>
      <Info className="info"/>
    </div>;
  }
}
