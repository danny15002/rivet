class PicNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startIdx: this.props.pictures.length - 1
    };

    this.getVisiblePictures = this.getVisiblePictures.bind(this);
  }

  getVisiblePictures() {
    const pics = this.props.pictures;
    const start = this.state.startIdx;
    const N = pics.length;

    if (N <= 8) {
      return pics;
    }

    if ((start + 8) <= N) {
      return pics.slice(start, start + 7);
    } else if ((start + 8) > N) {
      return pics.slice(start, N).concat(pics.slice(0, start + 8 - N));
    }
  }

  render() {
    const visiblePictures = this.getVisiblePictures();

    return <div className="pic-nav">
      { visiblePictures.map( pic => <Thumbnail src={pic.thumbnail.url} />) }
    </div>;
  }
}
