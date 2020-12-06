import React from 'react';
import ReactModal from 'react-modal';
import './modal.scss'

ReactModal.setAppElement(document.getElementById('root'));

const Modal = ({ showModal, hideModal, update, saveUpdate, setUpdate }) => {

  return (
    <ReactModal isOpen={showModal} onRequestClose={hideModal} >
      <div className="modal">
        <div className="message">
          <textarea className='postMessage' name='updatemessage' onChange={(e) => setUpdate(e.target.value)} value={update} placeholder='Modifier message' />
        </div>
        <div className="modalButton">
          <button onClick={() => saveUpdate(update)} className='UpdateMessageSubmit' value='Modifier' required >Valider</button>
          <button onClick={hideModal}>Annuler la modification</button>
        </div>
      </div>
    </ReactModal>
  );
};

export default Modal;