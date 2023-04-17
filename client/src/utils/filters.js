import moment from "moment"

export function truncate(target, len, clamp = '...') {
    return target.length > len ? target.slice(0, len) + clamp : target;
}

export function datetime(target, format = 'MMMM Do YYYY, h:mm:ss a') {
    return moment(target).format(format)
}

export function eachProp(target, handle) {
    const result = {};
    for (let prop in target) {
        result[prop] = handle(target[prop], prop);
    }
    return result;
}

export function log(...values) {
    for (let i = 0; i < values.length; i++) {
        console.log(values[i]);
    }
}

export function touch(value, callback) {
    callback(value);
    return value;
}

export function touchLog(value) {
    return touch(value, log);
}

export function cmpObj(object1, object2, fields) {

    function cmp(value1, value2, cast) {
        value1 = typeof cast === "function" ? cast(value1) : value1
        value2 = typeof cast === "function" ? cast(value2) : value2

        if (value1 < value2) {
            return -1;
        }
        if (value1 > value2) {
            return 1;
        }

        return 0;
    }

    let fieldsToCompare = {};
    if (Array.isArray(fields)) {
        for (let i = 0; i < fields.length; i++) {
            fieldsToCompare[fields[i]] = null;
        }
    } else {
        fieldsToCompare = fields;
    }

    let field, cast, value1, value2, cmpResult;
    for (field in fieldsToCompare) {
        cast = fieldsToCompare[field];
        value1 = object1.hasOwnProperty(field) ? object1[field] : null;
        value2 = object1.hasOwnProperty(field) ? object2[field] : null;

        cmpResult = cmp(value1, value2, cast);
        if (cmpResult !== 0) {
            return cmpResult;
        }
    }

    return 0;
}

function OnceAction(delay) {
    this.delay = delay;
    this.stack = [];
}

OnceAction.prototype.handle = function (job) {
    var previousJob = this.stack.pop();
    if (!! previousJob) {
        clearTimeout(previousJob);
    }

    this.stack.push(setTimeout(() => {
        this.stack.pop();
        job();
    }, this.delay));
};

export function createOnceAction(delay) {
    const handler = new OnceAction(delay || 300);
    return (job) => handler.handle(job);
}

export default {}