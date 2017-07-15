class BigPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.picture.video) {
      return <div className="big-picture">
        <video height="640px" width="640px" controls>
          <source src={this.props.picture.video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    }
    return <div className="big-picture" onClick={this.changePicture}>
      <img src={this.props.picture.thumbnail.url} />
      <PicMenu />
    </div>
  }
}
