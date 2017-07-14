class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="info">
      <div>
        <div className="info-heading">
          <h1>{this.props.title}</h1>
          <div className="rating">{this.props.rating}</div>
          <h5>Submitted by: {this.props.user}</h5>
        </div>
        <div className="info-comment">
          <p>{this.props.comment.text.text}</p>
        </div>
      </div>
    </div>;
  }
}
