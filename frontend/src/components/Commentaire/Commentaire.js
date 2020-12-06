import React, { Fragment, useEffect, useState } from "react";
import userService from '../../services/user.service'
import Avatar from 'react-avatar';
import { Link } from "react-router-dom";
import './Commentaire.scss'
import PostCommentaire from '../PostCommentaire/PostCommentaire'
import DeleteButton from '../DeleteButton/DeleteButton';
import UpdateButton from '../UpdateButton/UpdateButton';

const Commentaire = ({ idPARENT }) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        userService.getcommentaires(idPARENT)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.data);
                    console.log(result.data);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <Fragment>
                <PostCommentaire idPARENT={idPARENT} />
                {items.map((item, i) => (
                    <div className='commentaire' key={i}>
                        <div className='action'>
                            <DeleteButton idMESSAGES={item.idMESSAGES} idUSERS={item.idUSERS} multimedia={item.multimedia}/>
                            <UpdateButton idMESSAGES={item.idMESSAGES} idUSERS={item.idUSERS} message={item.message} />
                        </div>
                        <div className="entete">
                        <Avatar className='avatar' name={item.username} size="50"/>
                            <div className='username'>
                                <a href={'/user/' + item.idUSERS}>{item.username}</a>
                                <div className='create'>{item.created_at}</div>
                            </div>
                        </div>
                        <div className='text'>{item.message}</div>
                    </div>
                ))}
            </Fragment>
        );
    };
};
export default Commentaire;