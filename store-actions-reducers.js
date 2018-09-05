
// from actions/types.js (in the codebase, functions and consts are exported as needed)

const FILTER = 'FILTER';
const CHANGE_ACTIVE_SET = 'CHANGE_ACTIVE_SET';
const CHANGE_ACTIVE_BRD = 'CHANGE_ACTIVE_BRD';


// actions/index.js 
function changeActiveSet(whichSet) {
    return {
        type: types.CHANGE_ACTIVE_SET,
        whichSet
    };
}

function changeActiveBrd(selectedBrdValue) {
    return {
        type: types.CHANGE_ACTIVE_BRD,
        selectedBrdValue
    };
}

// reducers/index.js


import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const active = (state = {whichSet: '', selectedBrdValue: ''}, action) => {
    switch (action.type) {
        case types.CHANGE_ACTIVE_SET:
            let newState = {...state, ...{}};
            newState = {...newState, ...{whichSet: action.whichSet}};
            return newState;
        case types.CHANGE_ACTIVE_BRD:
            newState = {...state, ...{}};
            newState = {...newState, ...{selectedBrdValue: action.selectedBrdValue}};
            return newState;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    active,
    routing
});

export default rootReducer;