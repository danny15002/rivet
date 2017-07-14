class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPictureIdx: 0
    };
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(event) {
    console.log('closing modal');
    event.preventDefault();
    ReactRouter.browserHistory.push('/');
  }

  render() {
    const activeProduct = this.props.pictures[this.props.params.picId];
    let productPictures = activeProduct.ingredients.slice(1, activeProduct.ingredients.length - 2);
    if (activeProduct.ingredients.length = 3) {
      productPictures = [ activeProduct.ingredients[1] ];
    }
    const activePicture = productPictures[this.state.currentPictureIdx]
    const user = activeProduct.socialUser.userName.text
    const rating = activeProduct.ingredients[0].rating.value
    const title = activePicture.title.text || '(No Title)'

    console.log('rendering modal', activeProduct.ingredients)
    let comment = activeProduct.ingredients[activeProduct.ingredients.length - 1];
    if (comment.displayLabel != 'Tell us about your experience') {
      comment = activeProduct.ingredients[activeProduct.ingredients.length - 2];
    }

    return <div className="modal">
      <span onClick={this.closeModal} className="fa fa-times fa-2x modal-close"></span>

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
    </div>;
  }
}
