import { useState } from 'react';

import { useCarpoolContext } from '../Hooks/useCarpoolContext';
import { carpool_actions } from '../Context/CarpoolContext';

import { useAuthContext } from '../Hooks/useAuthContext';

const CarpoolForm = () => {
    const { dispatch } = useCarpoolContext();
    const { user } = useAuthContext();

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        days: [],
        starting_location: '',
        ending_location: '',
        interval: '',
        cost: 0,
        vehicle_type: '',
        seater: 0,
        stops: [],
    });

    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'days' || name === 'stops') {
            // Split the input value by comma and trim each item
            const updatedValue = value.split(',').map(item => item.trim());
            setFormData({
                ...formData,
                [name]: updatedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const response = await fetch('/carpool', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        });

        const json_object = await response.json();

        if (!response.ok) {
            setError(json_object.error);
            setEmptyFields(json_object.emptyFields || []);
        } else {
            setFormData({
                title: '',
                body: '',
                days: [],
                starting_location: '',
                ending_location: '',
                interval: '',
                cost: 0,
                vehicle_type: '',
                seater: 0,
                stops: [],
            });
            setError(null);
            dispatch({
                type: carpool_actions.CREATE_NEW_CARPOOL_POST,
                payload: json_object,
            });
            setEmptyFields([]);
            console.log('New Carpool Post is added', json_object);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add Your Schedule</h3>

            <label>Title</label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={formData.title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Any Extra Details</label>
            <input
                type="text"
                name="body"
                onChange={handleChange}
                value={formData.body}
                className={emptyFields.includes('body') ? 'error' : ''}
            />

            <label>Days (Separated by commas)</label>
            <input
                type="text"
                name="days"
                onChange={handleChange}
                value={formData.days.join(', ')}
                className={emptyFields.includes('days') ? 'error' : ''}
            />

            <label>Starting Location</label>
            <input
                type="text"
                name="starting_location"
                onChange={handleChange}
                value={formData.starting_location}
                className={emptyFields.includes('starting_location') ? 'error' : ''}
            />

            <label>Ending Location</label>
            <input
                type="text"
                name="ending_location"
                onChange={handleChange}
                value={formData.ending_location}
                className={emptyFields.includes('ending_location') ? 'error' : ''}
            />

            <label>Interval</label>
            <input
                type="text"
                name="interval"
                onChange={handleChange}
                value={formData.interval}
                className={emptyFields.includes('interval') ? 'error' : ''}
            />

            <label>Cost</label>
            <input
                type="number"
                name="cost"
                onChange={handleChange}
                value={formData.cost}
                className={emptyFields.includes('cost') ? 'error' : ''}
            />

            <label>Vehicle Type</label>
            <input
                type="text"
                name="vehicle_type"
                onChange={handleChange}
                value={formData.vehicle_type}
                className={emptyFields.includes('vehicle_type') ? 'error' : ''}
            />

            <label>Seater</label>
            <input
                type="number"
                name="seater"
                onChange={handleChange}
                value={formData.seater}
                className={emptyFields.includes('seater') ? 'error' : ''}
            />

            <label>Stops (Separated by commas)</label>
            <input
                type="text"
                name="stops"
                onChange={handleChange}
                value={formData.stops.join(', ')}
                className={emptyFields.includes('stops') ? 'error' : ''}
            />

            <button>Add Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default CarpoolForm;
