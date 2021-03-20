import React, {useEffect} from 'react';

const RideDetails = (props) => {
    useEffect(
        ()=>{
            //Todo: get ride details   this.props.match.params.id
        }
    )
    return (
        <div>
            {props.match.params.id}
        </div>
    )
}

export default RideDetails;