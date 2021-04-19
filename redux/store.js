import {createStore} from 'redux';
import {combineReducers} from 'redux';
import packageReducer from './reducers/paquetes';

// const reducers = {
//     characterReducer
// }

const combined = combineReducers({
    paquetes: packageReducer
})

const store = createStore(combined);

export default store;