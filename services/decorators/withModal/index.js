import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';

import './withModal.scss';

export default function withModal(component, options = {}) {
  return function(Child) {
    @injectIntl
    class CustomModal extends Component {
      state = {
        open: false,
      };

      handleOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      render() {
        return (
          <div>
            <Modal open={this.state.open} onClose={this.handleClose}>
              <div className="modal-window">
                {options.withClose && (
                  <div className="close-wrapper">
                    <Close onClick={this.handleClose} />
                  </div>
                )}
                <h1>test</h1>
              </div>
            </Modal>
            <Child
              {...this.props}
              translate={this.translate}
              open={this.handleOpen}
              close={this.handleClose}
            />
          </div>
        );
      }
    }
    return CustomModal;
  };
}
