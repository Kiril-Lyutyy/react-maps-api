import React, { Component } from 'react'
import placeTypes from './PlaceTypes'
import Select from '../UI/Select/Select'
import { Map, GoogleApiWrapper, InfoWindow, Marker, PlaceService } from 'google-maps-react'
import {connect} from 'react-redux'
import {getNearest, onSelectChange, saveMarker, removeMarkers, toggleMarkersHandler} from '../../store/actions/googleMap'

import ClassList from './GoogleMap.scss'

import pin from '../../img/pin.png'
import nearest from '../../img/nearest.png'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const apiKey = 'AIzaSyBe2N0evjzAD0H3-ibBhBDN5APIAi_iBNI';

class GoogleMap extends Component {

    constructor (props) {
        super(props);
        this.state = {

            mapStyles: {
                width: 'calc(100% - 30px)',
                height: '100%'
            },

            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},

            userPin: {
                url: pin,
                scaledSize: { width: 48, height: 48 },
                size: { width: 48, height: 48 }
            },

            userNearest: {
                url: nearest,
                scaledSize: { width: 48, height: 48 },
                size: { width: 48, height: 48 }
            },

            placeTypes,

        };
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    };

    onClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    saveMarkers = () => {
        if (this.props.markers.length !== 0) {
            localStorage.setItem('userMarkers', JSON.stringify(this.props.markers));
            alert('Markers saved!')
        } else {
            alert ('Please create at least one custom marker on the map to save...')
        }
    };

    render() {

        const select = <Select
            label={'Select object type:'}
            value={this.props.selectValue}
            onChange={(e) => this.props.onSelectChange(e.target.value)}
            defaultValue="Please select value"
            options={this.state.placeTypes}
        />;

        return (
            <Container>
                <Row>
                    <Col sm={4}>
                        <Card>
                            <Card.Header as="h5" className={ClassList.title}>Filter objects by type</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Select object type from the list below and press "Show nearest objects" button to show them on the map.
                                </Card.Text>
                                {select}
                                <div>
                                    <Button variant="primary" onClick={() => {this.props.getNearest(
                                        {
                                            nearest: this.props.nearest,
                                            currentLocation: this.props.currentLocation,
                                            radius: this.props.radius,
                                            selectValue: this.props.selectValue,
                                            apiKey: apiKey
                                        }
                                    )}}>Show nearest objects</Button>
                                </div>
                                <br/>
                                {this.props.trigger ? <p>Found <b>{this.props.nearest.length}</b> objects</p> : null}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={8}>

                        <div id="map">

                            <Map
                                google={this.props.google}
                                zoom={14}
                                style={this.state.mapStyles}
                                initialCenter={this.props.currentLocation}
                                onClick={(t, map, coord) => this.props.saveMarker(t, map, coord, this.props.markers)}
                            >
                                {this.props.showUserMarkers ? this.props.markers.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        icon={this.state.userPin}
                                        title={marker.title}
                                        name={marker.name}
                                        position={marker.position}
                                        onClick={this.onMarkerClick}
                                        markerIndex={index}
                                    />
                                )) : null}

                                {this.props.nearest.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        icon={this.state.userNearest}
                                        name={marker.name}
                                        position={
                                            marker.geometry.location
                                        }
                                        onClick={this.onMarkerClick}
                                    />
                                ))}

                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={this.state.showingInfoWindow}
                                    onClose={this.onClose}
                                >
                                    <div>
                                        <h4>{this.state.selectedPlace.title}</h4>
                                        <p>{this.state.selectedPlace.name}</p>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </div>

                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card className={ClassList.google_map__card}>
                            <Card.Header as="h5" className={ClassList.title}>Custom markers</Card.Header>
                            <Card.Body>
                                <Card.Title>Create custom markers</Card.Title>
                                <Card.Text>
                                    Left click on a map creates a new custom marker.<br/>
                                    To save custom markers in a browser session press "Save custom markers" button.<br/>
                                    To show/hide custom markers use "Toggle visibility" button.<br/>
                                    To remove all markers from the map use "Remove al" button.
                                </Card.Text>
                                <Button className={ClassList.google_map__btn}
                                        variant="success" onClick={this.saveMarkers}>Save custom markers</Button>
                                <Button className={ClassList.google_map__btn}
                                        variant="primary" onClick={() => {this.props.toggleMarkersHandler(this.props.showUserMarkers)}}>Toggle visibility</Button>
                                <Button variant="danger" onClick={this.props.removeMarkers}>Remove all</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>


        );
    }
}

function mapStateToProps(state) {
    return {
        markers: state.googleMap.markers,
        nearest: state.googleMap.nearest,
        currentLocation: state.googleMap.currentLocation,
        radius: state.googleMap.radius,
        selectValue: state.googleMap.selectValue,
        showUserMarkers: state.googleMap.showUserMarkers,
        trigger: state.googleMap.trigger,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getNearest: (props) => dispatch(getNearest(props)),
        onSelectChange: (props) => dispatch(onSelectChange(props)),
        saveMarker: (t, map, coord, markers) => dispatch(saveMarker(t, map, coord, markers)),
        removeMarkers: (props) => dispatch(removeMarkers(props)),
        toggleMarkersHandler: (props) => dispatch(toggleMarkersHandler(props)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    GoogleApiWrapper({
        apiKey: (apiKey)
    })(GoogleMap)
)