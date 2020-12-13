import React from 'react';

import BadgeDetails from './BadgeDetails';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import api from '../api';
import { db } from '../firebaseDB';

class BadgeDetailsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { params } = this.props.match;
    this.setState({ loading: true, error: null });

    db.collection('cards').doc(params.badgeId).onSnapshot((snapshot) => {
      const values = snapshot.data();

      const data = {
        ...values,
        id: params.badgeId,
      };

      this.setState({ loading: false, data });
    }, (error) => {
      this.setState({ loading: false, error });
    });
  };

  handleOpenModal = (e) => {
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = (e) => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBadge = async (e) => {
    this.setState({ loading: true, error: null });

    try {
      db.collection('cards').doc(this.props.match.params.badgeId).delete();
      this.setState({ loading: false });

      this.props.history.push('/badges');
    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        badge={this.state.data}
      />
    );
  }
}

export default BadgeDetailsContainer;
