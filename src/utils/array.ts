export const groupBy = (arr: { [key: string]: any }[], property: string) => {
    console.log(arr)
    return arr.reduce((memo, x) => {
            let val = x[property] as string;
            if (!memo.hasOwnProperty(val)) {
                memo[val] = [x];
            } else {
                memo[val].push(x);
            }
            return memo;
        },
        {});
}