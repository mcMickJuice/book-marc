export const getAreaFromState = state => {
    return areaId => state.area.filter(a => a.id === areaId)[0]
}