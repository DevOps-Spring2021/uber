import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Rides = () => {
    const [rides, setRides] = useState(['1','2']);
    useEffect(
        () => {
            //Todo make api call to get all rides 
        }
    );  
    const renderHTML = () => {
        return rides.map((ride) => {
            return (
                <div key={ride}>
                    ride 
                    <Link to={`/rides/${ride}`}>Details</Link>
                </div>
            );
        });
    }
    return (
        <div>
            {renderHTML()}
        </div>
    )
}

export default Rides;