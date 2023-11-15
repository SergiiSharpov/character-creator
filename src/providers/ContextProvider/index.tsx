import React, {createContext, useContext, useState} from 'react';
import {AnimationObjectGroup, Object3D, Event} from "three";
import {ContextProviderProps, ContextType} from "./types";

const animationObjectGroup = new AnimationObjectGroup()

const Context = createContext<ContextType>({
    animationObjectGroup,
    setAnimationObjectGroup: () => {
    }
});

const ContextProvider = (
    {
        children
    }: ContextProviderProps) => {

    const [state, setState] = useState<AnimationObjectGroup | Object3D<Event> | null>(animationObjectGroup)

    return (
        <Context.Provider value={{
            animationObjectGroup: state,
            setAnimationObjectGroup: (animationObjectGroup: AnimationObjectGroup | Object3D<Event>) => setState(animationObjectGroup)
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;

export const useAppContext = () => useContext(Context);
export const useAppContextSelector = <T extends keyof ContextType>(selector: T) => useContext(Context)[selector];