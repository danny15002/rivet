class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="thumbnail">
      <img src={this.props.src} />
    </div>;
  }
}
