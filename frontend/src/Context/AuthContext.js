import { createContext, useReducer, useEffect} from 'react';

export const AuthContext = createContext();


export const userObject = {
    'LOGIN': 'the user is logged in the application ',
    'LOGOUT': 'the user is logged out of the application'
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case userObject.LOGIN:
            return { user: action.payload }
        case userObject.LOGOUT:
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {                   // to check if the user if still logged in on refresh of page
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type: userObject.LOGIN, payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}