import React from 'react';
import Header from '../Header/Header';
import './OnePage.scss'

function onePage(props) {
  return (
    <div className="page">
      <Header/>
      { props.children }
    </div>
  );
}

export default onePage;