class BigPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('big picture', this.props);
    return <div className="big-picture">
      <img src={this.props.picture.thumbnail.url}></img>
      <PicMenu />
    </div>
  }
}
