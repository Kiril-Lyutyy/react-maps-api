import {
    GET_NEAREST_START,
    GET_NEAREST_SUCCESS,
    GET_NEAREST_ERROR,
    ON_SELECT_CHANGE,
    ADD_MARKER,
    REMOVE_MARKERS,
    TOGGLE_MARKERS,
} from '../actions/actionTypes';

const initialState = {
    markers: localStorage['userMarkers'] ? JSON.parse(localStorage['userMarkers']) : [],
    showUserMarkers: true,
    nearest: [],
    error: null,
    trigger: false,
    currentLocation: {
        lat: 46.482525,
        lng: 30.723309
    },
    radius: 2000,
    selectValue: 'accounting',
};

export default function googleMap(state = initialState, action) {
    switch (action.type) {
        case GET_NEAREST_START:
            return {
                ...state,
                trigger: action.trigger,
            };
        case GET_NEAREST_SUCCESS:
            return {
                ...state,
                nearest: action.nearest,
            };
        case GET_NEAREST_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case ON_SELECT_CHANGE:
            return {
                ...state,
                selectValue: action.selectValue,
            };
        case ADD_MARKER:
            return {
                ...state,
                markers: action.markers,
            };
        case REMOVE_MARKERS:
            return {
                ...state,
                markers: action.markers,
            };
        case TOGGLE_MARKERS:
            return {
                ...state,
                showUserMarkers: action.showUserMarkers,
            };
        default:
            return state
    }
}