class PicNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchBy: '',
      searchInput:  ''
    }
  }

  render() {
    return <div className="pic-nav">
      Pic Nav
      <Thumbnail />
    </div>;
  }
}
