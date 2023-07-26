// type ListItemType = {
//     id: string
//     name: string
//     unavailable: false
// }

import {ModelType} from "../Character/utils/generateModelPaths";

export type SelectProps = {
    // list: ListItemType[]
    list: string[]
    selected: string
    setSelected: (item: string) => void
    type: ModelType
}