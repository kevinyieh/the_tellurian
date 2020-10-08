//TODO:
// stylesheets!
// import stylesheet

import React from 'react';
import {
  connect
} from 'react-redux';
import {
  closeModal
} from '../../actions/modal_actions';
import Feed from './feed';

class Modal extends React.Component {
  render () {
    if (!this.props.modal) return null;
    return (
      <div className={'modal-background'}
        onClick={this.props.closeModal}>
        <div className="modal-dialog"
          onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <Feed />
          </div>
        </div>
      </div>
    )
  }
}

const mSTP = state => ({
  modal: state.ui.modal
})
const mDTP = dispatch => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(mSTP, mDTP)(Modal);