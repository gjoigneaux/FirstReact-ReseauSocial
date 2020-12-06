import React, { useEffect, useState } from "react";
import './accueil.scss';
import Layout from '../components/Layout/OnePage';
import Message from '../components/Message/Message';
import Post from '../components/Post/Post';
import userService from '../services/user.service'
import AuthService from "../services/auth.service";
//corepondance route

function Accueil() {
  const currentUser = AuthService.getCurrentUser();
  const [items, setItems] = useState([]);
  // Remarque : le tableau vide de dépendances [] indique
  // que useEffect ne s’exécutera qu’une fois, un peu comme
  // componentDidMount()
  useEffect(() => {
    userService.getallmessages()
      .then(
        (result) => {
          setItems(result.data);
        },
      )
  }, [])

  if (currentUser) {
    console.log(items);
    return (
      <Layout>
        <Post />
        <section className="post">
          {items.map((item,i) => (
            <Message idUSERS={item.idUSERS} username={item.username}
              created={item.created_at} message={item.message} idMESSAGES={item.idMESSAGES} multimedia={item.multimedia} key={i} />
          ))}
        </section>
      </Layout>
    );
  }
  else {
    return (
      <Layout>
        <section className="Not">Merci de bien vouloir vous connecté</section>
      </Layout>);
  };
}

export default Accueil;
