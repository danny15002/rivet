class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.titleInfo)
    return <div className="info">
      {this.props.titleInfo.text.text}
    </div>;
  }
}
