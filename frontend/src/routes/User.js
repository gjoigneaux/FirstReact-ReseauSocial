import React, { useEffect, useState } from "react";
import './user.scss';
import { useParams } from "react-router-dom";
import Layout from '../components/Layout/OnePage';
import Message from '../components/Message/Message';
import userService from '../services/user.service'
import DeleteUser from '../components/DeleteUser/DeleteUser'

function User() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  let { id } = useParams();

  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    userService.getallmessagesoneuser(id)
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data);
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

      <Layout>
        <section className="post">
          <DeleteUser idUSERS={id}/>
          {items.map((item,i) => (
            <Message idUSERS={item.idUSERS} username={item.username}
              created={item.created_at} message={item.message} idMESSAGES={item.idMESSAGES} multimedia={item.multimedia} keys={i}/>
          ))}
        </section>
      </Layout>
    );
  }
}

export default User;