class SmallPicture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="small-picture hover-pointer">
      <img src={this.props.pic.ingredients[1].thumbnail.url}  data-index={this.props.index} />
    </div>;
  }
}
