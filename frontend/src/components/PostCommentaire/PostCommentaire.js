import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import userService from '../../services/user.service'
import './PostCommentaire.scss';

function PostCommentaire( {idPARENT} ) {
    const currentUser = AuthService.getCurrentUser();
    const initialPostCommentaireState = {
        idPARENT: idPARENT,
        idUSERS: currentUser.userId,
        username: currentUser.username,
        message: "",
    };
    const [postCommentaire, setPostCommentaire] = useState(initialPostCommentaireState);

    const handleInputChangeCommentaire = event => {
        const { name, value } = event.target;
        setPostCommentaire({ ...postCommentaire, [name]: value });
    };

    const savePostCommentaire = () => {
        if (postCommentaire.commentaire !== undefined) {
            var data = {
                idPARENT: idPARENT,
                idUSERS: currentUser.userId,
                username: currentUser.username,
                message: postCommentaire.commentaire,
            };

            userService.postCommentaire(data)
                .then(response => {
                    setPostCommentaire({
                        data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
            window.location.reload(true);
        }
        else {
            alert("Pas de commentaire");
        }
    }
    return (
        <div className="postcom">
            <textarea className='postCommentaire' name='commentaire' value={postCommentaire.commentaire} onChange={handleInputChangeCommentaire} placeholder='Votre commentaire' aria-label="Votre commentaire"/>
            <input type='submit'  onClick={savePostCommentaire} className='postCommentaireSubmit' value='Post' />
        </div>
    );
}

export default PostCommentaire;