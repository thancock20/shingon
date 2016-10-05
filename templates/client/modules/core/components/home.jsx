import React from 'react';
import Helmet from 'react-helmet';

const Home = () => (
  <div>
    <Helmet title="Home" />
    <h1>Shingon</h1>
    <p>
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

export default Home;
