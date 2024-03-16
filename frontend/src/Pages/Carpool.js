import { useEffect, useCallback } from 'react';

import CarpoolDetails from '../Components/CarpoolDetails';
import CarpoolForm from '../Components/CarpoolForm';

import { useCarpoolContext } from '../Hooks/useCarpoolContext';
import { carpool_actions } from '../Context/CarpoolContext';

import {useAuthContext} from '../Hooks/useAuthContext';

const Carpool = () => {
    const { carpool_info, dispatch } = useCarpoolContext();
    const { user } = useAuthContext();

    // useCallback is used to prevent unnecessary re-renders
    const fetchCarpoolInfo = useCallback(async () => { 
        try {
            const response = await fetch('/carpool', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch carpool information');
            }
            const array_of_carpoolInfo = await response.json();
            
            if(response.ok){
                dispatch({ type: carpool_actions.CARPOOL_INFO, payload: array_of_carpoolInfo });
            }
        } catch (error) {
            console.error('Error fetching carpool information:', error);
        }
    }, [dispatch, user]);

    useEffect(() => {
        if(user){
            fetchCarpoolInfo();
        }
    }, [fetchCarpoolInfo, user]);

    return ( 
        <div className='home'>
            <div className='carpoolinfos'>
                <h1>Your CarPooling Plan</h1>
                {carpool_info && carpool_info.map((one_carpool_post) => (
                    <CarpoolDetails key={one_carpool_post._id} carpoolinfo={one_carpool_post}/>
                ))}
            </div>
            <CarpoolForm />
        </div>
     );
}

export default Carpool;