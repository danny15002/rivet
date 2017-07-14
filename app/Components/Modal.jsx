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
    const pictures = activeProduct.ingredients.slice(1, activeProduct.ingredients.length - 2);
    console.log('rendering modal', pictures)
    return <div className="modal">
      <span onClick={this.closeModal} className="fa fa-times fa-2x modal-close"></span>

      <div className="modal-left">
        <BigPicture className="big-picture" picture={pictures[this.state.currentPictureIdx]}/>
        <PicNav pictures={pictures}/>
      </div>

      <div className="modal-right">
        <Info className="info" titleInfo={activeProduct.ingredients[activeProduct.ingredients.length - 2]}/>
      </div>
    </div>;
  }
}
