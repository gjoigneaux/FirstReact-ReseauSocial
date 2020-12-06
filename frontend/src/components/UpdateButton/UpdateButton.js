import React, { Fragment, useState } from "react";
import './UpdateButton.scss';
import userService from '../../services/user.service'
import AuthService from "../../services/auth.service";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Modal/Modal';


const UpdateButton = ({ idUSERS, message, idMESSAGES }) => {
    const currentUser = AuthService.getCurrentUser();

    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(message);

    const handleSubmit = (newMessage) => {
        setUpdate(newMessage);
        saveUpdate(update);
    }

    const saveUpdate = (updatedMessage) => {
        if (updatedMessage !== "") {
            var data = {
                idMESSAGES: idMESSAGES,
                updatemessage: updatedMessage
            };

            console.log(updatedMessage);
            userService.updatePost(data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            window.location.reload(true);
        }
        else {
            alert("Champs vide");
        }
        console.log(updatedMessage);
    }

    return (
        <Fragment>
            {currentUser.userId === idUSERS ?
                <button className='UpdateButton' aria-label='Update Message' onClick={() => setShowModal(true)}><FontAwesomeIcon className='UpdateIcon' icon={faEdit} /></button> :
                ""}
            <Modal showModal={showModal} hideModal={() => setShowModal(false)} update={update} saveUpdate={handleSubmit} setUpdate={setUpdate}/>
        </Fragment>
    )

};
export default UpdateButton;