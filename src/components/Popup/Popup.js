import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';
import React from 'react';

const Popup = ({
  type,
  title,
  content,
  isOpen,
  labelOK,
  labelCancel,
  classes,
  toggle,
  actionOK,
  actionCancel,
}) => {
  let buttonActions = (
    <React.Fragment>
      <Button color="secondary" onClick={actionCancel ? actionCancel : toggle}>
        {labelCancel}
      </Button>
      <Button color="primary" onClick={actionOK}>
        {labelOK ? labelOK : 'OK'}
      </Button>{' '}
    </React.Fragment>
  );

  if (type === 'message') {
    buttonActions = (
      <Button color="primary" onClick={actionOK ? actionOK : toggle}>
        {labelOK}
      </Button>
    );
  }

  return (
    <Modal isOpen={isOpen} className={classes}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>{buttonActions}</ModalFooter>
    </Modal>
  );
};

Popup.propTypes = {
  type: PropTypes.oneOf(['message', 'confirm']),
  title: PropTypes.any,
  content: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  labelOK: PropTypes.string,
  labelCancel: PropTypes.string,
  classes: PropTypes.string,
  actionOK: PropTypes.func,
  actionCancel: PropTypes.func,
};

Popup.defaultProps = {
  type: 'message',
  title: 'Inform',
  isOpen: false,
  labelOK: 'OK',
  labelCancel: 'Cancel',
  actionOK: null,
  actionCancel: null,
  classes: '',
};

export default Popup;
