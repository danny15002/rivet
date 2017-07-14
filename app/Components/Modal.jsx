class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPictureIdx: 0
    };
    this.closeModal = this.closeModal.bind(this);
    this.advance = this.advance.bind(this);
  }

  componentWillMount() {
    const body = document.getElementById('body');
    body.classList.add('locked-body');
  }

  componentWillUnmount() {
    const body = document.getElementById('body');
    body.classList.remove('locked-body');
  }

  closeModal(event) {
    console.log('closing modal');
    event.preventDefault();
    ReactRouter.browserHistory.push('/');
  }

  advance(direction) {
    return function (event) {
      event.preventDefault();
      const total = this.props.pictures.length;
      let picId = (Number(this.props.params.picId) + direction);
      if (picId > (total - 1)) picId = 0;
      if (picId < 0) picId = 12;
      ReactRouter.browserHistory.push('/reviews/' + picId);
    }.bind(this);
  }

  render() {
    const activeProduct = this.props.pictures[this.props.params.picId];
    let productPictures = activeProduct.ingredients.slice(1, activeProduct.ingredients.length - 2);

    const activePicture = productPictures[this.state.currentPictureIdx];
    const user = !!activeProduct.socialUser ? activeProduct.socialUser.userName.text : '(No Username)';
    const rating = activeProduct.ingredients[0].rating.value;
    const title = activePicture.title.text || '(No Title)';
    //
    console.log('rendering modal', activeProduct.identifier.id, activeProduct.ingredients)
    let comment = activeProduct.ingredients[activeProduct.ingredients.length - 1];
    console.log('comment1', comment)

    if (comment.displayLabel != 'Tell us about your experience') {
      comment = activeProduct.ingredients[activeProduct.ingredients.length - 2];
    }
    console.log('comment', comment)
    return <div>
      <div id="veil" />
      <div className='modal-container'>
        <span onClick={this.advance(-1)} className="fa fa-chevron-left fa-3x hover-pointer modal-left-arrow"></span>
        <span onClick={this.advance(1)} className="fa fa-chevron-right fa-3x hover-pointer modal-right-arrow"></span>
        <span onClick={this.closeModal} className="fa fa-times fa-2x hover-pointer modal-close"></span>
        <div className="modal">
          <div className="modal-left">
            <BigPicture className="big-picture" picture={activePicture}/>
            <PicNav pictures={productPictures}/>
          </div>

          <div className="modal-right">
            <Info
              className="info"
              title={title}
              rating={rating}
              user={user}
              comment={comment}/>
          </div>
        </div>
      </div>
    </div>;
  }
}
