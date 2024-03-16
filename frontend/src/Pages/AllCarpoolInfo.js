import { useEffect, useCallback } from 'react';

import CarpoolDetailsWithoutAuth from '../Components/CarpoolDetailsWithoutAuth';

import { useCarpoolContext } from '../Hooks/useCarpoolContext';
import { carpool_actions } from '../Context/CarpoolContext';


const Carpool = () => {
    const { carpool_info, dispatch } = useCarpoolContext();

    // useCallback is used to prevent unnecessary re-renders
    const fetchCarpoolInfo = useCallback(async () => { 
        try {
            const response = await fetch('/carpool/all_carpoolpool');
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
    }, [dispatch]);
    

    useEffect(() => {
        console.log(carpool_info); // Log carpool_info state
        fetchCarpoolInfo();
    }, [fetchCarpoolInfo]);

    return ( 
        <div className='home'>
            <div className='carpoolinfos'>
                <h1>All Carpool Posts</h1>
                {carpool_info && carpool_info.map((one_carpool_post) => (
                    <CarpoolDetailsWithoutAuth key={one_carpool_post._id} carpoolinfo={one_carpool_post}/>
                ))}
            </div>
        </div>
     );
}

export default Carpool;