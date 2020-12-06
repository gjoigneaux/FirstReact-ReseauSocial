import React, { Fragment, useState } from "react";
import './DeleteButton.scss';
import userService from '../../services/user.service'
import AuthService from "../../services/auth.service";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const DeleteButton = ({ idMESSAGES, idUSERS, multimedia }) => {
    const currentUser = AuthService.getCurrentUser();
    const DeletePost = () => {
        userService.deletePost(idMESSAGES, multimedia)
            .then(response => {
                window.location.reload(true);
            })
            .catch(e => {
                alert("Erreur !");
            });
    }

    if (currentUser.userId === idUSERS || currentUser.status === 'admin') {
        return (
            <button onClick={DeletePost} className='DeleteButton' aria-label='Delete Message'><FontAwesomeIcon className='DeleteIcon' icon={faTrashAlt} /></button>
        );
    }
    else {
        return (<Fragment></Fragment>)
    }
};

export default DeleteButton;