class PicMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleHeart() {

  }

  render() {
    return <div className="pic-menu">
      <span onClick={this.toggleHeart} className="fa fa-heart fa-2x hover-pointer"/>
      <span onClick={this.toggleHeart} className="fa fa-share-alt-square fa-2x hover-pointer"/>
    </div>;
  }
}
