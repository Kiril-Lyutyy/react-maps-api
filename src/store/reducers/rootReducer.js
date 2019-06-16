import {combineReducers} from 'redux'
import googleMapReducer from './googleMap'

export default combineReducers({
    googleMap: googleMapReducer,
})
