import { useCarpoolContext } from '../Hooks/useCarpoolContext';
import { carpool_actions } from '../Context/CarpoolContext';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import {useAuthContext} from '../Hooks/useAuthContext';

const CarpoolDetails = ({ carpoolinfo }) => {
    const { dispatch } = useCarpoolContext();
    const { user } = useAuthContext();

    const handleDelete = async () => {

        if(!user){
            return;

        }
        const response = await fetch(`/carpool/${carpoolinfo._id}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const deleted_json_object = await response.json();

        // to re-fetch the data after the Delete operation
        // const response2 = await fetch('/carpool');
        // const all_carpool_info = await response2.json();

        if (response.ok) {
            dispatch({ type: carpool_actions.DELETE_POST, payload: deleted_json_object });
            // dispatch({ type: carpool_actions.CARPOOL_INFO, payload: all_carpool_info });
        }
    }

    return (
        <div className="carpoolinfos-details">
            <h4>{carpoolinfo.title}</h4>
            <p><strong></strong>{carpoolinfo.body}</p>
            <p><strong>Days - </strong>{carpoolinfo.days}</p>
            <p><strong>Starting Location - </strong>{carpoolinfo.starting_location}</p>
            <p><strong>Ending Location - </strong>{carpoolinfo.ending_location}</p>
            <p><strong>Interval - </strong>{carpoolinfo.interval}</p>
            <p><strong>Cost - </strong>{carpoolinfo.cost}</p>
            <p><strong>Vehicle Type - </strong>{carpoolinfo.vehicle_type}</p>
            <p><strong>Seater - </strong>{carpoolinfo.seater}</p>
            <p><strong>Stops - </strong>{carpoolinfo.stops.join(', ')}</p>
            <br></br>
            <p><strong>Posted   &nbsp; </strong>{formatDistanceToNow(new Date(carpoolinfo.createdAt), { addSuffix: true })}</p>
            <span onClick={handleDelete}>
                <svg style={{ width: '20px', justifyContent: 'center' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </span>
        </div>
    );
}

export default CarpoolDetails;