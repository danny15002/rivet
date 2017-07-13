class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <div className="modal">
      Content Display
      <BigPicture className="big-picture"/>
      <Info className="info"/>
    </div>;
  }
}
