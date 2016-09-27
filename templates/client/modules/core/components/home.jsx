import React from 'react';
import Load from '/lib/load_jss';
import Helmet from 'react-helmet';

const Home = () => (
  <div>
    <Helmet title="Home" />
    <h1>Shingon</h1>
    <p className={classes.welcome}>
      Welcome to Shingon.
    </p>
    <ul>
      <li>
        Read <a target="_blank" href="https://kadirahq.github.io/mantra/">the mantra spec</a>
      </li>
      <li>
        Learn <a target="_blank" href="https://github.com/thancock20/shingon#commands">CLI</a>
      </li>
    </ul>
  </div>
);

const styles = {
  welcome: {
    fontSize: 20,
    color: 'red'
  }
};
const classes = Load(styles);

export default Home;
