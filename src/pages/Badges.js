import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import geekLogo from '../images/geek_icon.png';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import Banner from '../components/banner';
import { auth } from '../firebaseInitializeApp';

import { db } from '../firebaseDB';

const Badges = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    db.collection('cards')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setData(snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })));
        setLoading(false);
      }, (error) => {
        console.log(error);
        setLoading(false);
        setError(null);
      });
  };

  const checkUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(':)');
      }
    });
  };

  useEffect(() => {
    fetchData();
    checkUser();

  }, []);

  if (loading === true && !data) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <Fragment>
      <Banner />

      <div className='Badges__container'>

        <BadgesList badges={data} />

        {loading && <MiniLoader />}
      </div>
    </Fragment>
  );

};

export default Badges;
