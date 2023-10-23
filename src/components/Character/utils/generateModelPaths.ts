
export type ModelType = 'hairstyles' | 'bottom' | 'shoes' | 'top' | 'accessories'

export const generateModelPaths = (type: ModelType, count: number = 10) => {
    const paths = []
    for (let i = 1; i <= count; i++) {
        // paths.push(`/models/${type}/${i}.glb`)
        paths.push(`/models/${type}/${i}.glb`)
    }
    return paths
}

export const generateThumbnailsPaths = (type: string, count: number = 10) => {
    const paths = []
    for (let i = 1; i <= count; i++) {
        // paths.push(`/models/${type}/${i}.glb`)
        paths.push(`/thumbnails/${type}/${i}.jpg`)
    }
    return paths
}