class PicNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startIdx: 0
    };
  }

  render() {
    const pics = this.props.pictures;
    const startIdx = this.state.startIdx;
    console.log('pic nav', this.props.pictures)
    const visiblePictures =
      [ pics[pics.length - 1] ].concat(pics.slice(startIdx, startIdx + 7));

    return <div className="pic-nav">
      { visiblePictures.map( pic => <Thumbnail src={pic.thumbnail.url} />) }
    </div>;
  }
}
