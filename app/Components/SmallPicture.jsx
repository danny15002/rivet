class SmallPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="small-picture">
      <img src={this.props.pic.ingredients[1].thumbnail.url} alt=""/>
    </div>;
  }
}
