import {generateModelPaths} from "./utils/generateModelPaths";

export const topModelsPaths = generateModelPaths('top')
export const bottomModelsPaths = generateModelPaths('bottom')
export const shoesModelsPaths = generateModelPaths('shoes')
export const hairstylesModelsPaths = generateModelPaths('hairstyles')

export const skinColors = [
    '#f5d3c9',
    '#e5c298',
    '#d5b07a',
    '#c59c6b',
    '#b5885c',
    '#a5744d',
    '#95603e',
    '#854c2f',
    '#753820',
    '#652411',
]

export type VisemeType = Record<string, string>

export const visemeTeeth1: VisemeType = {
    'B': 'Viseme_Teeth.EE',
    'C': 'Viseme_Teeth.Ah',
    'E': 'Viseme_Teeth.Er',
    'F': 'Viseme_Teeth.W_OO',
    'G': 'Viseme_Teeth.F_V',
    'H': 'Viseme_Teeth.T_L_D_N',
    'X': 'Viseme_Teeth.B_M_P'
}

export const visemeTeeth2: VisemeType = {
    'B': 'Viseme_Teeth.EE',
    'C': 'Viseme_Teeth.Ah',
    'E': 'Viseme_Teeth.Er',
    'F': 'Viseme_Teeth.W_OO',
    'G': 'Viseme_Teeth.F_V',
    'H': 'Viseme_Teeth.T_L_D_N',
    'X': 'Viseme_Teeth.B_M_P'
}

export const visemeTongue: VisemeType = {
    'B': 'Viseme_Tongue.EE',
    'C': 'Viseme_Tongue.Ah',
    'E': 'Viseme_Tongue.Er',
    'F': 'Viseme_Tongue.W_OO',
    'G': 'Viseme_Tongue.F_V',
    'H': 'Viseme_Tongue.T_L_D_N',
    'X': 'Viseme_Tongue.B_M_P'
}