import {db} from '../firebaseDB';

const FETCH_TODOS = 'FETCH_TODOS';

export const addCharacter = (newCharacter) => async dispatch => {
  db.push().set(newCharacter);
};

export const removeCharacter = (removeCharacter) => async dispatch => {
  db.child(removeCharacter).remove();
};

export const fetchCharacters = () => async dispatch => {
  db.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};
