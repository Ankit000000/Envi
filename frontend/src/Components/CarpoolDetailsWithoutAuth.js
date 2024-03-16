
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


import { Link } from "react-router-dom";

const CarpoolDetailsWithoutAuth = ({ carpoolinfo }) => {

    // const handleDelete = async () => {

    //     if (!user) {
    //         return;

    //     }
    //     const response = await fetch(`/carpool/${carpoolinfo._id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //     const deleted_json_object = await response.json();

    //     // to re-fetch the data after the Delete operation
    //     // const response2 = await fetch('/carpool');
    //     // const all_carpool_info = await response2.json();

    //     if (response.ok) {
    //         dispatch({ type: carpool_actions.DELETE_POST, payload: deleted_json_object });
    //         // dispatch({ type: carpool_actions.CARPOOL_INFO, payload: all_carpool_info });
    //     }
    // }

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
            <span>
                <Link to='/carpool'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                        <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
                    </svg>
                </Link>
            </span>
        </div>
    );
}

export default CarpoolDetailsWithoutAuth;