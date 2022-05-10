export function sortItems(items: any, sortBy: string, isDesc: boolean) {
    return isDesc ?
        items.sort((x: any, y: any) => y[sortBy] - x[sortBy])
        : items.sort((x: any, y: any) => x[sortBy] - y[sortBy]);
}
