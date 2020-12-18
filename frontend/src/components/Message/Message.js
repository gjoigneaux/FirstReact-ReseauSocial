import React from 'react';
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import './Message.scss';
import Commentaire from '../Commentaire/Commentaire';
import DeleteButton from '../DeleteButton/DeleteButton';
import UpdateButton from '../UpdateButton/UpdateButton';

const Message = ({ idUSERS, username, created, message, idMESSAGES, multimedia }) => {

  //FORMAT DATE
  const date = created.split('T');
  const jours1 = date[0].split('-');
  const jours = jours1[2] + '/' + jours1[1] + '/' + jours1[0];
  const heure = date[1].split('.');
  const datetime = jours + ' ' + heure[0];
  
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
              <div className="heure">{datetime}</div>
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
              <div className="heure">{datetime}</div>
            </div>
          </div>
          <p className="messagetext">
            {message}
          </p>
          <img className='image' src={multimedia} />
        </div>
        <Commentaire idPARENT={idMESSAGES} />
      </article>
    );
  }
};

export default Message;
