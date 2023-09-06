import {ModelsPathsType} from "../../components/Character/types";

export interface AppearanceSettingsProps {
    modelsPaths: ModelsPathsType
    handleModelChange: (type: keyof ModelsPathsType) => (value: string) => void
    handleSetSkinColor: (color: string) => void
}