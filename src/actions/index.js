import { db } from '../firebaseDB';

const FETCH_TODOS = 'FETCH_TODOS';

export const addCharacter = newCharacter => async (dispatch) => {
  db.push().set(newCharacter);
};

export const removeCharacter = removeCharacter => async (dispatch) => {
  db.child(removeCharacter).remove();
};

export const fetchCharacters = () => async (dispatch) => {
  db.on('value', (snapshot) => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val(),
    });
  });
};

//this is the object of each card
export const badgeObject = {
  cardName: '',
  saga: '',
  type: '',
  avatarURL: '',
  status: 'To Sell',
};

export const optionStatuses = [
  { id: 1, name: 'To Sell' },
  { id: 2, name: 'Buyed' },
  { id: 3, name: 'Reviewing...' },
];

export const optionsTypes = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Normal' },
  { id: 3, name: 'Rare' },
  { id: 4, name: 'Secret Rare' },
];
