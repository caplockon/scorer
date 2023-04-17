import {unref} from "vue";
import {eachProp} from "@/utils/filters";
import {i18n} from "@/utils/modules";
import * as yup from "yup";

function getErrors(validationError, first = false) {
    var errors = {};
    var getters;

    if (first) {
        getters = function (error) {
            if (errors.hasOwnProperty(error.path)) {
                return;
            }

            errors[error.path] = error.message;
        };
    } else {
        getters = function (error) {
            if (!errors.hasOwnProperty(error.path)) {
                errors[error.path] = [];
            }

            errors[error.path].push(error.message);
        };
    }

    validationError.inner.map(getters);

    return errors;
}

function normalizeValue(value) {
    let result = {};
    for (let prop in value) {
        result[prop] = unref(value[prop]);
    }
    return result;
}

export const validate = function (schema, value) {
    return new Promise((resolve, reject) => {
        schema.validate(normalizeValue(value), {abortEarly: false}).then(resolve).catch(function (e) {
            reject(getErrors(e, true));
        });
    });
};

export const validateWithI18n = function (specs, value) {
    return validate(yup.object(specs), value).then(validated => validated, e => {
        throw eachProp(e, (v) => i18n.global.t(v));
    });
}
