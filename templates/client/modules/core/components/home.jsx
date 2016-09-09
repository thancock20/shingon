import React from 'react';
import useSheet from 'react-jss';
import Helmet from 'react-helmet';

const Home = ({ sheet }) => {
  const { welcome } = sheet.classes;

  return (
    <div>
      <Helmet title="Home" />
      <h1>Mantra</h1>
      <p className={welcome}>
        Welcome to Mantra 0.2.0.
      </p>
      <ul>
        <li>
          Read <a target="_blank" href="https://kadirahq.github.io/mantra/">spec</a>
        </li>
        <li>
          Learn <a target="_blank" href="https://github.com/sungwoncho/mantra-cli#commands">CLI</a>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  welcome: {
    fontSize: 20,
    color: 'red'
  }
};

export default useSheet(Home, styles);
