import { useAuthContext } from './useAuthContext';
import { userObject } from '../Context/AuthContext';
import { useCarpoolContext } from './useCarpoolContext';
import { carpool_actions } from '../Context/CarpoolContext'

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: carpoolDispatch } = useCarpoolContext();

    const logout = () => {
        // removing user from LocalStorage
        localStorage.removeItem('user')

        // dispatching logout action
        dispatch({ type: userObject.LOGOUT });
        carpoolDispatch({type: carpool_actions.CARPOOL_INFO, payload: null});
    }

    return {logout};
}