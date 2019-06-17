import axios from 'axios';
import {
    GET_NEAREST_START,
    GET_NEAREST_SUCCESS,
    GET_NEAREST_ERROR,
    ON_SELECT_CHANGE,
    ADD_MARKER,
    REMOVE_MARKERS,
    TOGGLE_MARKERS,
} from './actionTypes';

export function getNearest (props) {

    return dispatch => {

        dispatch(getNearestStart(true));

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

        axios.get(proxyurl + url, {
            params: {
                location: props.currentLocation.lat + ',' + props.currentLocation.lng,
                radius: props.radius,
                type: props.selectValue,
                //keyword: '',
                key: props.apiKey,
            }
        }).then(resp => {
            dispatch(getNearestSuccess(resp.data.results));
        }).catch(err => {
            dispatch(getNearestError(err))
        })
    }
}

export function saveMarker (t, map, coord, markers) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    return dispatch => {
        dispatch(addMarker([
            ...markers,
                {
                    title: "Custom marker " + (markers.length + 1),
                    name: "Location coord: " + lat + ' ' + lng,
                    position: { lat, lng }
                }
            ]
        ));
    }
}

export function toggleMarkersHandler (oldVal) {
    const newVal = !oldVal;
    return dispatch => {
        dispatch(toggleMarkers(newVal))
    }
}

export function addMarker (markers) {

    //console.log('markers', markers)

    return {
        type: ADD_MARKER,
        markers
    }
}

export function removeMarkers () {

    localStorage.removeItem('userMarkers');

    alert('Markers removed!');

    return {
        type: REMOVE_MARKERS,
        markers: [],
    }
}

export function toggleMarkers (showUserMarkers) {
    return {
        type: TOGGLE_MARKERS,
        showUserMarkers,
    }
}

export function getNearestStart (trigger) {

    console.log('Making request...');

    return {
        type: GET_NEAREST_START,
        trigger: trigger,
    }
}

export function getNearestSuccess (nearest) {

    console.log('Success');

    return {
        type: GET_NEAREST_SUCCESS,
        nearest
    }
}

export function getNearestError (error) {

    console.log(error);

    return {
        type: GET_NEAREST_ERROR,
        error
    }
}

export function onSelectChange (selectValue) {
    console.log('changed');

    return {
        type: ON_SELECT_CHANGE,
        selectValue
    }
}