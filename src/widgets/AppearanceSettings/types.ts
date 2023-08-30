import {AnimationTypeEnum, ModelsPathsType} from "../../components/Character/types";

export interface AppearanceSettingsProps {
    handleAnimationChange: (type: AnimationTypeEnum) => () => void
    modelsPaths: ModelsPathsType
    handleModelChange: (type: keyof ModelsPathsType) => (value: string) => void
    handleSetSkinColor: (color: string) => void
}