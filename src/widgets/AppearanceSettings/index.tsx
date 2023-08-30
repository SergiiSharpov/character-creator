import React from 'react';
import {
    bottomModelsPaths,
    hairstylesModelsPaths,
    shoesModelsPaths, skinColors,
    topModelsPaths
} from "../../components/Character/constants";
import {AnimationTypeEnum} from "../../components/Character/types";
import Accordion from "../../components/ui/Accordion";
import {AppearanceSettingsProps} from "./types";

const AppearanceSettings = ({
                                handleAnimationChange,
                                handleModelChange,
                                handleSetSkinColor
                            }: AppearanceSettingsProps) => {

    return (
        <div 
            className='absolute top-14 right-14 z-50 grid gap-10 overflow-auto max-h-[873px]'
            style={{
                backgroundColor: 'rgba(0, 50, 40, 0.1)',
                borderRadius: '10px',
                padding: '16px',
                userSelect: 'none'
            }}
        >

            <div className='flex gap-2'>
                <button onClick={handleAnimationChange(AnimationTypeEnum.Idle)} className='ui__btn'>Idle
                </button>
                <button onClick={handleAnimationChange(AnimationTypeEnum.Walk)} className='ui__btn'>Walk
                </button>
            </div>

            <Accordion
                value={'top'}
                list={topModelsPaths}
                handleModelChange={handleModelChange('topModelPath')}
            />

            <Accordion
                value='bottom'
                list={bottomModelsPaths}
                handleModelChange={handleModelChange('bottomModelPath')}
            />

            <Accordion
                value={'shoes'}
                list={shoesModelsPaths}
                handleModelChange={handleModelChange('shoesModelPath')}
            />

            <Accordion
                value={'hairstyles'}
                list={hairstylesModelsPaths}
                handleModelChange={handleModelChange('hairstyleModelPath')}
            />

            <Accordion
                value={'skin'}
                list={skinColors}
                handleModelChange={handleSetSkinColor}
                handleSetSkinColor={handleSetSkinColor}
            />
        </div>
    );
};

export default AppearanceSettings;