import {Quaternion, Vector3} from "three";
import {generateModelPaths, generateThumbnailsPaths} from "./utils/generateModelPaths";

export const topModelsPaths = generateModelPaths('top')
export const bottomModelsPaths = generateModelPaths('bottom')
export const shoesModelsPaths = generateModelPaths('shoes')
export const hairstylesModelsPaths = generateModelPaths('hairstyles')
export const accessoriesModelsPaths = generateModelPaths('accessories')

export const hairstylesThumbnailsPaths = generateThumbnailsPaths('hairstyles')
export const bottomThumbnailsPaths = generateThumbnailsPaths('bottom')
export const shoesThumbnailsPaths = generateThumbnailsPaths('shoes')
export const topThumbnailsPaths = generateThumbnailsPaths('top')

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

export const Base_Teeth_primitive0: VisemeType = {
    'B': 'Viseme_Teeth.EE',
    'C': 'Viseme_Teeth.Ah',
    'E': 'Viseme_Teeth.Er',
    'F': 'Viseme_Teeth.W_OO',
    'G': 'Viseme_Teeth.F_V',
    'H': 'Viseme_Teeth.T_L_D_N',
    'X': 'Viseme_Teeth.B_M_P'
}

export const Base_Teeth_primitive1: VisemeType = {
    'B': 'Viseme_Teeth.EE',
    'C': 'Viseme_Teeth.Ah',
    'E': 'Viseme_Teeth.Er',
    'F': 'Viseme_Teeth.W_OO',
    'G': 'Viseme_Teeth.F_V',
    'H': 'Viseme_Teeth.T_L_D_N',
    'X': 'Viseme_Teeth.B_M_P'
}

export const Game_Head_primitive0: VisemeType = {
    'B': 'Viseme_Head.EE',
    'C': 'Viseme_Head.Ah',
    'E': 'Viseme_Head.Er',
    'F': 'Viseme_Head.W_OO',
    'G': 'Viseme_Head.F_V',
    'H': 'Viseme_Head.T_L_D_N',
    'X': 'Viseme_Head.B_M_P'
}

export const Game_Head_primitive1: VisemeType = {
    'B': 'Viseme_Head.EE',
    'C': 'Viseme_Head.Ah',
    'E': 'Viseme_Head.Er',
    'F': 'Viseme_Head.W_OO',
    'G': 'Viseme_Head.F_V',
    'H': 'Viseme_Head.T_L_D_N',
    'X': 'Viseme_Head.B_M_P'
}

export const Game_Head_primitive2: VisemeType = {
    'B': 'Viseme_Head.EE',
    'C': 'Viseme_Head.Ah',
    'E': 'Viseme_Head.Er',
    'F': 'Viseme_Head.W_OO',
    'G': 'Viseme_Head.F_V',
    'H': 'Viseme_Head.T_L_D_N',
    'X': 'Viseme_Head.B_M_P'
}

type AnnotationType = {
    annotationPosition: Vector3
    annotationLabel: string
    cameraPosition: Vector3
    cameraRotation: Quaternion
    icon: string
}

export const hairstyleModelAnnotation = {
    annotationPosition: new Vector3(0.23, 1.7, 0),
    // cameraPosition: new Vector3(0.75, 1.15, 1.3),
    cameraPosition: new Vector3(0.75, 1.15, 1.3),
    cameraRotation: new Quaternion(-0.23, 0.28, 0),
    annotationLabel: 'Hairstyles',
    icon: '/icons/hairstyles.svg'
}

export const topModelAnnotation: AnnotationType = {
    annotationPosition: new Vector3(0.35, 1.5, 0),
    cameraPosition: new Vector3(0.65, 0.75, 1.3),
    cameraRotation: new Quaternion(-0.23, 0.28, 0),
    annotationLabel: 'Top',
    icon: '/icons/top.svg'
}

export const bottomModelAnnotation = {
    annotationPosition: new Vector3(0.38, 0.85, 0),
    cameraPosition: new Vector3(0.65, 0.3, 1.3),
    cameraRotation: new Quaternion(-0.25, 0.22, 0),
    annotationLabel: 'Bottom',
    icon: '/icons/bottom.svg'
}

export const shoesModelAnnotation = {
    annotationPosition: new Vector3(0.3, 0.3, 0),
    cameraPosition: new Vector3(0.65, 0.2, 1.3),
    cameraRotation: new Quaternion(-0.32, 0.26, 0),
    annotationLabel: 'Shoes',
    icon: '/icons/shoes.svg'
}

export const accessoriesModelAnnotation = {
    annotationPosition: new Vector3(0.13, 1.9, 0),
    cameraPosition: new Vector3(0.85, 1.15, 1.3),
    cameraRotation: new Quaternion(-0.23, 0.2, 0),
    annotationLabel: 'Accessories',
    icon: '/icons/shoes.svg'
}


export const animationsAnnotation = {
    annotationPosition: new Vector3(0.45, 1.2, 0),
    cameraPosition: new Vector3(0, 1, 2),
    cameraRotation: new Quaternion(-0.229, 0, 0),
    annotationLabel: 'Animations',
    icon: '/icons/walk.svg'
}


export const menuConfig = {
    'Hairstyles': {
        value: hairstylesModelsPaths,
        thumbnailsPaths: hairstylesThumbnailsPaths,
    },
    'Top': {
        value: topModelsPaths,
        thumbnailsPaths: topThumbnailsPaths,
    },
    'Bottom': {
        value: bottomModelsPaths,
        thumbnailsPaths: bottomThumbnailsPaths,
    },
    'Shoes': {
        value: shoesModelsPaths,
        thumbnailsPaths: shoesThumbnailsPaths,
    },
    'Accessories': {
        value: accessoriesModelsPaths,
        thumbnailsPaths: hairstylesThumbnailsPaths,
    },
    'Animations': {
        value: [0, 1],
        thumbnailsPaths: hairstylesThumbnailsPaths.slice(0, 2),
    }
}