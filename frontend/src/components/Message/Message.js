import React from 'react';
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import './Message.scss';
import Commentaire from '../Commentaire/Commentaire';
import DeleteButton from '../DeleteButton/DeleteButton';
import UpdateButton from '../UpdateButton/UpdateButton';

const Message = ({ idUSERS, username, created, message, idMESSAGES, multimedia }) => {
  if (multimedia == null) {
    return (
      <article>
        <div className='message'>
          <div className="action">
            <DeleteButton idMESSAGES={idMESSAGES} idUSERS={idUSERS} multimedia={multimedia}/>
            <UpdateButton idMESSAGES={idMESSAGES} idUSERS={idUSERS} message={message} />
          </div>
          <div className="entete">
            <Avatar className='avatar' name={username} size="50" />
            <div className="entete_info">
              <Link className='nom' to={`/user/${idUSERS}`}>{username}</Link>
              <div className="heure">{created}</div>
            </div>
          </div>
          <p className="messagetext">
            {message}
          </p>
        </div>
        <Commentaire idPARENT={idMESSAGES} />
      </article>
    );
  } else {
    return (
      <article>
        <div className='message'>
          <div className="action">
            <DeleteButton idMESSAGES={idMESSAGES} idUSERS={idUSERS} multimedia={multimedia}/>
            <UpdateButton idMESSAGES={idMESSAGES} idUSERS={idUSERS} message={message} />
          </div>
          <div className="entete">
            <Avatar className='avatar' name={username} size="50" />
            <div className="entete_info">
              <Link className='nom' to={`/user/${idUSERS}`}>{username}</Link>
              <div className="heure">{created}</div>
            </div>
          </div>
          <p className="messagetext">
            {message}
          </p>
          <img class='image' src={multimedia} />
        </div>
        <Commentaire idPARENT={idMESSAGES} />
      </article>
    );
  }
};

export default Message;
