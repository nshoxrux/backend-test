export function removeCircularReferences(obj: any) {
    const seen = new WeakSet();
    function replacer(key: any, value:any) {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    }
    return JSON.parse(JSON.stringify(obj, replacer));
}