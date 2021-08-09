import {createStore} from 'redux';
import appReducer from '../reducers';

/**
 * @returns {Object} The Redux store.
 */
const configureStore = () => createStore(appReducer);

export default configureStore;
