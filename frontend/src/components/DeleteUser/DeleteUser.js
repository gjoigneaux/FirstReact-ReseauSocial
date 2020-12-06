import React, { Fragment } from "react";
import './DeleteUser.scss';
import userService from '../../services/user.service'
import AuthService from "../../services/auth.service";


const DeleteUser = ({ idUSERS }) => {
    const currentUser = AuthService.getCurrentUser();

    const DeleteUse = () => {
        userService.deleteuser(idUSERS)
            .then(response => {
                sessionStorage.removeItem('user');
                window.location = 'http://localhost:3001/';
            })
            .catch(e => {
                alert("Erreur !");
            });
    }

    const DeleteUseAdmin = () => {
        userService.deleteuser(idUSERS)
            .then(response => {
                window.location.reload(true);
                window.location = 'http://localhost:3001/';
            })
            .catch(e => {
                alert("Erreur !");
            });
    }

    if (currentUser.userId == idUSERS) {
        return (
            <article>
                <button onClick={DeleteUse} className='DeleteUser'>Supprimer le profil</button>
            </article>
        );
    }
    else if (currentUser.status === 'admin') {
        return (
            <article>
                <button onClick={DeleteUseAdmin} className='DeleteUser'>Supprimer le profil</button>
            </article>
        );
    }
    else {
        return (<Fragment></Fragment>)
    }
};
export default DeleteUser;