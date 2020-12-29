import React from 'react';

import ProductDetails from '../components/ProductDetails';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import PageHeader from '../components/pageHeader';
//import api from '../api';
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

    //COMMENTS
    db.collection('cards').doc(params.badgeId).collection('comments').orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        const values = snapshot.docs.map(doc => ({
          ...doc.data(),
        }));

        this.setState({ data: { ...this.state.data, comments: values } });
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
    const { data, loading, error, modalIsOpen } = this.state;

    if (loading) {
      return <PageLoading />;
    }

    if (error) {
      return <PageError error={error} />;
    }

    return (
      <div>
        <PageHeader headertitle='Products Details' subheader='pages' />
        <ProductDetails
          onCloseModal={this.handleCloseModal}
          onOpenModal={this.handleOpenModal}
          modalIsOpen={modalIsOpen}
          onDeleteBadge={this.handleDeleteBadge}
          badge={data}
        />
      </div>

    );
  }
}

export default BadgeDetailsContainer;
