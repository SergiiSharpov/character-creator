import React, {createContext, useContext, useState} from 'react';
import {AnimationObjectGroup} from "three";
import {ContextProviderProps, ContextType} from "./types";

const animationObjectGroup = new AnimationObjectGroup()

const Context = createContext<ContextType>({
    animationObjectGroup
});

const ContextProvider = ({
    children
                         }: ContextProviderProps) => {

    const [state, setState] = useState<ContextType>({
        animationObjectGroup
    })

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export const useAppContext = () => useContext(Context);
export const useAppContextSelector = <T extends keyof ContextType>(selector: T) => useContext(Context)[selector];