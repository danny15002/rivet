class PicNav extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      startIdx: this.props.pictures.length - 1
    };

    this.getVisiblePictures = this.getVisiblePictures.bind(this);
    this.advance = this.advance.bind(this);
    this.changePicture = this.changePicture.bind(this);
  }

  getVisiblePictures() {
    const pics = this.props.pictures;
    const start = this.state.startIdx;
    const N = pics.length;

    if (N < 8) {
      return [ { thumbnail: { url: '' } } ].concat(pics);
    }

    if ((start + 8) <= N) {
      return pics.slice(start, start + 8);
    } else if ((start + 8) > N) {
      return pics.slice(start, N).concat(pics.slice(0, start + 8 - N));
    }
  }

  advance(direction) {
    return function (event) {
      event.preventDefault();
      const total = this.props.pictures.length;
      let next = this.state.startIdx + direction;

      if (next > (total - 1)) next = 0;
      if (next < 0) next = total - 1;
      this.setState({
        startIdx: next
      });
    }.bind(this);
  }

  changePicture(event) {
    event.preventDefault();
    console.log(this.props)

    const idx = Number(event.target.dataset.picno);
    if (idx) {
      let targetIdx = this.state.startIdx + idx;
      if (targetIdx >= this.props.pictures.length) targetIdx -= this.props.pictures.length;
      console.log('changing picnav', Number(this.state.startIdx) + Number(idx))
      this.props.changePicture(targetIdx);
    }
  }

  render() {
    const visiblePictures = this.getVisiblePictures();
    console.log(visiblePictures)

    return <div className="pic-nav" onClick={this.changePicture}>
      <span onClick={this.advance(-1)} className="fa fa-chevron-circle-left fa-2x hover-pointer pic-nav-left-arrow"></span>
      <span onClick={this.advance(1)} className="fa fa-chevron-circle-right fa-2x hover-pointer pic-nav-right-arrow"></span>
      { visiblePictures.map( (pic, idx) => {
          if (!pic.thumbnail.url) {
            return <div className="thumbnail" style={{ width: '80px', height: '80px',  display: 'inline-block' }}>
              <img src="" style={{ border: 0, background: "transparent" }} />
            </div>;
          }
          return <Thumbnail src={pic.thumbnail.url} index={idx} key={idx} />;
        })
      }
    </div>;
  }
}
