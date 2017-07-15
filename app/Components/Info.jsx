class Info extends React.Component {
  constructor(props) {
    super(props);
    this.getRating = this.getRating.bind(this)
  }

  getRating() {
    const stars = [];
    let count = 0;
    for (let i = 0; i < this.props.rating; i++) {
      stars.push('star');
      count++
    }

    for (let i = count; i < 5; i++) {
      stars.push('star-o');
    }

    return <div>
      { stars.map((star, idx) => <span className={ 'rating-star fa fa-' + star + ' fa-2x ' }/>) }
    </div>;
  }

  render() {
    return <div className="info">
      <div>
        <div className="info-heading">
          <h1>{this.props.title}</h1>
          <div className="rating">{this.getRating()}</div>
          <h5>Submitted by: {this.props.user}</h5>
        </div>
        <div className="info-comment">
          <p>{this.props.comment.text.text}</p>
        </div>
      </div>
    </div>;
  }
}
