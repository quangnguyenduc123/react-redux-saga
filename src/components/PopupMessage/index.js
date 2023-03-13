import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React from 'react';
import { closePopupMessage } from '../../store/actions/ui';
import connect from 'react-redux/es/connect/connect';
import { Translate } from 'react-localize-redux';

const PopupMessage = (props) => {
  let buttonActions = (
    <React.Fragment>
      <Button color="primary" onClick={ props.onClosePopup }>
        OK
      </Button>{ ' ' }
    </React.Fragment>
  );


  return (
    <Modal isOpen={ props.isOpenPopup } >
      <ModalHeader toggle={ props.onClosePopup }>
        {props.popupConfigs.headerTitle || <Translate id="global.inform" />}
      </ModalHeader>
      <ModalBody>{ props.popupConfigs.message }</ModalBody>
      <ModalFooter>{ buttonActions }</ModalFooter>
    </Modal>
  );
};


const mapStateToProps = state => {
  return {
    popupConfigs: state.ui.popupConfigs,
    isOpenPopup: state.ui.isOpenPopup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClosePopup: () => dispatch(closePopupMessage())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PopupMessage);
