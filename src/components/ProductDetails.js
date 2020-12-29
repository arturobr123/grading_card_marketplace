import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import DeleteBadgeModal from './DeleteBadgeModal';

import PageLoading from './PageLoading';
import { db } from '../firebaseDB';
import { handleChange } from '../actions/BadgeActions';
import { setUserToForm, setUserToState } from '../actions/userActions';

class ProductDetails extends React.Component {

  state = {
    loading: false,
    error: null,
    form: {
      comment: '',
      user_uid: 'invited',
      user_name: 'UserName',
    },
  };

  constructor(props) {
    super(props);

    this.handleChange = handleChange.bind(this);
    this.setUserToForm = setUserToForm.bind(this);
    this.setUserToState = setUserToState.bind(this);
  }

  componentDidMount() {
    this.setUserToForm();
    this.setUserToState();
  }

  handleSubmitComment = async (e) => {
    console.log('handleSubmitComment');
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      this.setState({ form: { ...this.state.form, timestamp: firebase.firestore.FieldValue.serverTimestamp() } });
      db.collection('cards').doc(this.props.badge.id).collection('comments').add(this.state.form);

      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, error });

      console.log(this.props.error);
    }
  };

  render() {
    const { badge, onOpenModal, modalIsOpen, onCloseModal, onDeleteBadge } = this.props;

    const comments = badge.comments ? badge.comments : [];

    console.log('DATA');
    console.log(badge);

    return (
      <section className='product-details pd-top-100'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8'>
              <div className='single-product-wrap'>
                <div className='thumb'>
                  <img src={badge.avatarURL} alt='image' />
                  <a className='btn btn-white' href='#'>Live Preview</a>
                  <a className='btn btn-white btn-buy' href='#'>Buy Now</a>
                </div>
                <div className='single-product-details'>
                  <h4><a href='#'>{badge.cardName}</a></h4>
                  <p>
                    Saga:
                    {' '}
                    {badge.saga}
                  </p>
                </div>
              </div>
              <div className='product-tab'>
                <ul className='nav nav-pills'>
                  <li className='nav-item'>
                    <a className='nav-link active' data-toggle='pill' href='#pills-home'>
                      Description/saga

                    </a>
                  </li>
                  <li className='nav-item'>
                    <a className='nav-link' data-toggle='pill' href='#pills-profile'>
                      Comments (
                      {comments.length}
                      )
                    </a>
                  </li>
                </ul>
                <div className='tab-content'>
                  <div className='tab-pane fade show active' id='pills-home'>
                    <p>{badge.saga}</p>
                    <h5 className='title'>Features Overview</h5>
                    <ul>
                      <li>
                        <p className='font-medium'>Type:</p>
                        <p>{badge.type}</p>
                      </li>
                      <li>
                        <p className='font-medium'>Status:</p>
                        <p>{badge.status}</p>
                      </li>
                      <li>
                        <p className='font-medium'>Grade Company:</p>
                        <p>{badge.gradeCompany}</p>
                      </li>
                      <li>
                        <p className='font-medium'>Grade :</p>
                        <p>{badge.grade}</p>
                      </li>
                    </ul>
                  </div>
                  <div className='tab-pane fade' id='pills-profile'>
                    <h5 className='title'>
                      Comments (
                      {comments.length}
                      )
                    </h5>
                    {/* COMMENTS */}
                    {comments.map((comment) => {
                      return (
                        <div className='single-review'>
                          <h6 className='name'>{comment.user_name}</h6>
                          <span className='date'>13 August 2019</span>
                          <p>{comment.comment}</p>
                        </div>
                      );
                    })}

                    <div className='add-review'>
                      <h5 className='title'>Add Comment</h5>
                      <form onSubmit={this.handleSubmitComment}>

                        <div className='row'>
                          <div className='form-group col-6'>
                            <label>Comment</label>
                            <input
                              onChange={this.handleChange}
                              className='form-control'
                              type='text'
                              name='comment'
                              value={this.state.form.comment}
                            />
                          </div>
                        </div>

                        <p>Click 2 times to work correctly (fix)</p>
                        <button className='btn btn-primary'>
                          Save
                        </button>

                        {this.state.loading && (
                          <p>LOADING...</p>
                        )}

                        {this.state.error && (
                          <p className=''>{this.state.error.message}</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='sidebar-area'>
                <div className='widget widget-cart'>
                  <div className='widget-cart-inner text-center'>
                    <h3 className='price'>
                      $
                      {badge.price}
                    </h3>
                    <span className='ratting'>
                      <i className='fa fa-star' />
                      <i className='fa fa-star' />
                      <i className='fa fa-star' />
                      <i className='fa fa-star' />
                      <i className='fa fa-star star-o' />
                    </span>
                    <ul>
                      <li>
                        <i className='fa fa-shopping-cart' />
                        12 Sales
                      </li>
                      <li>
                        <i className='fa fa-star' />
                        5 Ratting
                      </li>
                      <li>
                        <i className='fa fa-eye' />
                        125 Views
                      </li>
                    </ul>
                    <a className='btn btn-base' href='#'>Add to cart</a>
                  </div>
                </div>
                <div className='widget widget-client text-center'>
                  {/* IF USER BELONGS THIS CARD, CAN UPDATE/DELETE THE CARD */}
                  {this.state.user_uid === badge.user_uid && (
                    <div className='col'>
                      <h2>Actions</h2>
                      <div>
                        <div>
                          <Link
                            className='btn btn-primary mb-4'
                            to={`/badges/${badge.id}/edit`}
                          >
                            Edit
                          </Link>
                        </div>

                        <div>
                          <button onClick={onOpenModal} className='btn btn-danger'>
                            Delete
                          </button>
                          <DeleteBadgeModal
                            isOpen={modalIsOpen}
                            onClose={onCloseModal}
                            onDeleteBadge={onDeleteBadge}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='thumb'>
                    {/* <img src={`${publicUrl}assets/img/icon/3.png`} alt='img' /> */}
                  </div>
                  <h4>Clay J. Barfield</h4>
                  <span className='ratting'>
                    <i className='fa fa-star' />
                    <i className='fa fa-star' />
                    <i className='fa fa-star' />
                    <i className='fa fa-star' />
                    <i className='fa fa-star star-o' />
                    <span>(12)</span>
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    );

  }
}

export default ProductDetails;

