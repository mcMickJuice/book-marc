export const noop = t => t;

export const range = to => {
    //TODO implement iterator

    const arr = [];
    let i = 0;
    while(i < to) {
        arr.push(i)
        i++
    }

    return arr;
}