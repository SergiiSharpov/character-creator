import React from 'react';
import {
    bottomModelsPaths,
    hairstylesModelsPaths,
    shoesModelsPaths,
    topModelsPaths
} from "../../components/Character/constants";
import {AnimationTypeEnum} from "../../components/Character/types";
import {Select} from "../../components/ui";
import {AppearanceSettingsProps} from "./types";

const AppearanceSettings = ({
    handleAnimationChange,
    modelsPaths,
                                handleModelChange
                            }: AppearanceSettingsProps) => {
    return (
        <div className='absolute top-14 right-14 z-50 grid gap-10'>

            <div className='flex gap-2'>
                <button onClick={handleAnimationChange(AnimationTypeEnum.Idle)} className='ui__btn'>Idle
                </button>
                <button onClick={handleAnimationChange(AnimationTypeEnum.Walk)} className='ui__btn'>Walk
                </button>
            </div>

            <Select
                type='top'
                list={topModelsPaths}
                selected={modelsPaths['topModelPath']}
                setSelected={handleModelChange('topModelPath')}
            />

            <Select
                type='bottom'
                list={bottomModelsPaths}
                selected={modelsPaths['bottomModelPath']}
                setSelected={handleModelChange('bottomModelPath')}
            />

            <Select
                type='shoes'
                list={shoesModelsPaths}
                selected={modelsPaths['shoesModelPath']}
                setSelected={handleModelChange('shoesModelPath')}
            />

            <Select
                type='hairstyles'
                list={hairstylesModelsPaths}
                selected={modelsPaths['hairstyleModelPath']}
                setSelected={handleModelChange('hairstyleModelPath')}
            />
        </div>
    );
};

export default AppearanceSettings;