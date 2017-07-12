class BigPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="big-picture">
      <PicMenu />
      Big Picture
      <PicNav />
    </div>
  }
}
