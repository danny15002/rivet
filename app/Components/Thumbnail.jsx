class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="thumbnail hover-pointer">
      <img src={this.props.src} data-picno={this.props.index}/>
    </div>;
  }
}
