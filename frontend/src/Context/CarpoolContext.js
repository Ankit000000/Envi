import { createContext, useReducer } from 'react';

export const CarpoolContext = createContext();


export const carpool_actions = {
    'CARPOOL_INFO': 'load the existing carpool data',
    'CREATE_NEW_CARPOOL_POST': 'load the newly added carpool post along with other posts',
    'DELETE_POST': 'Delete a carpool post '
}

export const CarpoolReducer = (state, action) => {
    switch (action.type) {
        case carpool_actions.CARPOOL_INFO:
            return {
                carpool_info: action.payload
            }
        case carpool_actions.CREATE_NEW_CARPOOL_POST:
            return {
                carpool_info: [action.payload, ...state.carpool_info]
            }
        case carpool_actions.DELETE_POST:
            return {
                carpool_info: state.carpool_info.filter((individual_post) => individual_post._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const CarpoolContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CarpoolReducer, {
        carpool_info: null
    })

    return (
        <CarpoolContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CarpoolContext.Provider>
    )
}