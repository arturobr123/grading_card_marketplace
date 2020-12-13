import React, { useEffect, useState } from 'react';

import './styles/Badges.css';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Gravatar from '../components/Gravatar';
import MiniLoader from '../components/MiniLoader';

import { auth } from '../firebaseInitializeApp';

import { db } from '../firebaseDB';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    uid: '',
  });

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    db.collection('cards').where('user_uid', '==', user.uid).get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(data);
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
        console.log('------');
        console.log(user.uid);
        setUser(user);
      }
    });
  };

  useEffect(() => {
    checkUser();
    fetchData();
  }, [user]); //if updates the user, query the cards again

  if (loading === true && !data) {
    return <PageLoading />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <div>
      <div className='row'>
        <div className='form-group col-6'>
          <h4>User</h4>
          <div>
            <h4>Name: </h4>
            {user.displayName}
          </div>
          <Gravatar className='Badge__avatar' avatarURL={user?.photoURL} />
        </div>
      </div>

      <div className='Badges__container'>
        <BadgesList badges={data} />
        {loading && <MiniLoader />}
      </div>
    </div>
  );

};

export default Profile;
