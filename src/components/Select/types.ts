// type ListItemType = {
//     id: string
//     name: string
//     unavailable: false
// }

export type SelectProps = {
    // list: ListItemType[]
    list: number[]
    selected: number
    setSelected: (item: number) => void
}