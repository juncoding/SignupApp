/**
 * @module Signup store
 * @description redux store for signup flow
 */

const SET_SIGNUP_STORE = 'SET_SIGNUP_STORE';
const RESET_SIGNUP_STORE = 'RESET_SIGNUP_STORE';

/**
 *
 * @param {Object} data
 *          {String} country
 *          {String} name
 *          {String} nric
 *          {String} plan
 *          {String} image
 * @returns {Object}
 */
export const setSignUpStore = data => ({
  type: SET_SIGNUP_STORE,
  data,
});

export const resetSignUpStore = () => ({
  type: RESET_SIGNUP_STORE,
});

const initialState = {
  country: '',
  name: '',
  nric: '',
  plan: 'a',
  image: '',
};

export const signUpStore = (state = initialState, action) => {
  switch (action.type) {
    case SET_SIGNUP_STORE:
      return {
        ...state,
        ...action.data,
      };
    case RESET_SIGNUP_STORE:
      return initialState;
  }
  return state;
};
