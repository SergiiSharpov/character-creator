export type ModelType = 'hairstyles' | 'bottom' | 'shoes' | 'top'

export const generateModelPaths = (type: ModelType, count: number = 10) => {
    const paths = []
    for (let i = 1; i <= count; i++) {
        paths.push(`/models/${type}/${i}.fbx`)
    }
    return paths
}