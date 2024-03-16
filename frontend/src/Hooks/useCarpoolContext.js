import { CarpoolContext } from "../Context/CarpoolContext";
import { useContext } from "react";

export const useCarpoolContext = () => {
    const context  = useContext(CarpoolContext);

    if(!context){
        throw Error("useCarpoolContext must be inside the CarpoolContextProvider");
    }
    else{
        return context;
    }
}