import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AutoComplete from "../AutoComplete/AutoComplete";
import Maps from "../Maps/Maps";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
const BookRide = () => {
    const history = useHistory();
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [showDirection, setShowDirection] = useState(null);
    const [showMarker, setShowMarker] = useState(null);
    const [userDisplay, setUserDisplay] = useState('');
    const [rideDate, setRideDate] = useState(new Date());
    const [schedule, setSchedule] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/rides/book`, {
            pickup: source.name,
            destination: destination.name,
            pickupPlaceId: source.place_id,
            destinationPlaceId: destination.place_id,
            rideDate: rideDate
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            },
        })
            .then(res => { history.push(`/rides/${res.data.rideID}`) })
            .catch(err => alert("error while booking ride"));
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/v1/users/`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        })
            .then(res => { setUserDisplay(res.data.firstName + " " + res.data.lastName) })
            .catch(err => console.log(err));
    }
        , [])
    const getLatLng = async (id) => {
        let url = `${process.env.REACT_APP_BACKEND_HOST}/maps/place_id/${id}`;
        let resp = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt")}`
            }
        });
        return resp.data.result.geometry.location;
    }
    const sourceChange = async (data) => {
        setSource(data);
        updateMap("src", data);

    }
    const destinationChange = (data) => {
        setDestination(data);
        updateMap("dest", data);
    }
    const updateMap = async (type, data) => {
        if (type == "src") {
            if (destination) {
                let srcCoords = await getLatLng(data.place_id);
                let dstCoords = await getLatLng(destination.place_id);
                setShowDirection({ src: srcCoords, dst: dstCoords });
                setShowMarker(null);
            }
            else {
                let coords = await getLatLng(data.place_id);
                setShowMarker({ src: coords });
                setShowDirection(null);
            }
        }
        else if (type == "dest") {
            if (source) {
                let dstCoords = await getLatLng(data.place_id);
                let srcCoords = await getLatLng(source.place_id);
                setShowDirection({ src: srcCoords, dst: dstCoords });
                setShowMarker(null);
            }
            else {
                let coords = await getLatLng(data.place_id);
                setShowMarker({ src: coords });
                setShowDirection(null);
            }
        }
        else {
            // clear map dummy image
            setShowDirection(null);
            setShowMarker(null);
        }
    }
    return (
        <div className="row main-div mt-5">
            <div className="col-4 d-flex align-items-center">
                <Form onSubmit={handleSubmit}>
                    <h3>Hi, {userDisplay}</h3>
                    <h5>Please book your ride</h5>
                    <AutoComplete label="Enter pickup location" onSelect={sourceChange}></AutoComplete>
                    <AutoComplete label="Enter destination" onSelect={destinationChange}></AutoComplete>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check onChange={(e) => { e.target.checked ? setSchedule(true) : setSchedule(false) }} type="checkbox" label="Schedule Ride?" />
                    </Form.Group>
                    {schedule && <Form.Group>
                        <Form.Control
                            type="date"
                            value={rideDate}
                            onChange={(e) => { setRideDate(e.target.value) }}
                        />
                    </Form.Group>}
                    <div>
                        <Button type="submit" className="bg-dark w-50">Book Ride</Button>
                    </div>
                </Form>
            </div>
            <div className="col-8">
                {(showDirection || showMarker)
                    &&
                    <Maps
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBkVS8RGY7sRZlk5LBh3-UprOGVKOVvi-w&v=3.exp&libraries=geometry,drawing,places,directions"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `calc(100vh - 8.0rem)` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        direction={showDirection}
                        marker={showMarker}
                    >
                    </Maps>
                }
            </div>
        </div>
    );
}
export default BookRide;