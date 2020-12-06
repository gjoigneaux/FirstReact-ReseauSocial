import React from "react";
import AuthService from "../../services/auth.service";
import "./Profil.scss";
import Layout from "../Layout/OnePage";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Layout>
      <section className="Profil">
        <div className="identifiant"><span>Identifiant :</span> {currentUser.username}</div>
        <button type='submit' className='DeleteAccount' required >Supprimer le compte</button>
      </section>
    </Layout>
  );
};

export default Profile;