import React from 'react';
import useSheet from 'react-jss';

import jss from 'jss';
import preset from 'jss-preset-default';
jss.setup(preset());

const Home = ({ sheet }) => {
  const { welcome } = sheet.classes;

  return (
    <div>
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
    fontSize: '20px',
    color: 'red'
  }
};

export default useSheet(Home, styles);
