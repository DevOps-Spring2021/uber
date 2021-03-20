import React, { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import axios from 'axios';
const AutoComplete = ({ label, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [timeoutId, setTimeoutId] = useState();

    const getLstLocation = async (e) => {
        setSearchTerm(e.target.value);
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        const timer = setTimeout(async () => {
            if (e.target.value) {
                let url = `${process.env.REACT_APP_BAKCEND_HOST}/maps/${e.target.value}`;
                let resp = await axios.get(url, {
                    headers: {
                        Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGIuY29tIiwiZXhwIjoxNjE2MjcxNTczLCJpYXQiOjE2MTYyNTM1NzN9.86VmjMBZdg2V3vmGJtHEISPUXt2ggOJ_-u3Z2n9tjoA201KLlMLjLJENCYexOY_XcSDd_bXQsY-Bv9nYXXeIYA"
                    }
                });
                setSearchList(resp?.data?.predictions?.map(pred => ({ name: pred.description, place_id: pred.place_id })).slice(0, 5) || [])
            }
        }, 500)
        setTimeoutId(timer);
    }
    return (
        <Form.Group controlId="formSource" className="position-relative">
            <Form.Control
                type="text"
                value={searchTerm}
                onInput={getLstLocation}
                placeholder={label}
                required />
            {searchList && (<ListGroup className="dropdown-location">
                {
                    searchList.map(({ name, place_id }) => {
                        return (
                            <ListGroup.Item key={place_id} onClick={(e) => { setSearchTerm(name); onSelect({ name, place_id }); setSearchList([]) }}>{name}</ListGroup.Item>
                        )
                    })
                }
            </ListGroup>)}
        </Form.Group>

    )
}

export default AutoComplete;