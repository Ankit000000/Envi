import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { userObject } from '../Context/AuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password })
        })

        const json_object = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json_object.error);
        }
        else{
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json_object))

            // update the auth context
            dispatch({type: userObject.LOGIN, payload: json_object})
            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}