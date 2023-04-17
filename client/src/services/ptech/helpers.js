/**
 * Normalize error of PTech service
 * @param e
 */
export const error = function (e) {

    /**
     * Return response status code
     * @returns {number|number}
     */
    function getStatusCode() {
        return e.response.status || 0;
    }

    /**
     * Return error message of server
     * @returns {*}
     */
    function getErrorMessage() {
        return e.response.data.message || res.message;
    }

    /**
     * Return the validation errors
     * @param handle
     * @returns {{}}
     */
    function getValidationErrors(handle = undefined) {
        handle = handle || ((errors) => errors[0]); // default to get the first error only
        if (getStatusCode() !== 422 || !e.response.data.errors) {
            return {};
        }

        const errors = {};
        for (let prop in e.response.data.errors) {
            errors[prop] = handle(e.response.data.errors[prop]);
        }
        return errors;
    }

    function getValidationErrorForFields(fields, handle = undefined) {
        const errors = getValidationErrors(handle);
        const results = {
            _: [] // Generic errors, any error that is not in the needed fields will be reported here
        };

        for (let field in errors) {
            if (fields.indexOf(field) >= 0) {
                results[field] = errors[field]
            } else {
                results._.push(errors[field]);
            }
        }

        return results;
    }

    function getObjectProp(object, name, defaultValue = null) {
        if (object.hasOwnProperty(name)) {
            return object[name];
        }

        return typeof defaultValue === "function"
            ? defaultValue()
            : defaultValue;
    }

    function takeGenericError(errors) {
        return getObjectProp(errors, '_', []);
    }

    return {
        getStatusCode, getErrorMessage, getValidationErrors, getValidationErrorForFields, takeGenericError
    }
}

export const throwError = function (e) {
    throw error(e);
}