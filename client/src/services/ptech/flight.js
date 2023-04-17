import {throwError} from "@/services/ptech/helpers";

/**
 * Interact with Flight objects
 * @param http
 * */
export default function (http) {

    /**
     * Get list with pagination
     * @param page
     * @param recordPerPage
     * @param orderBys
     * @returns {*}
     */
    function paginate(page, recordPerPage, orderBys) {
        return http.get('/api/flights')
            .then(res => res.data.data, e => throwError(e));
    }

    /**
     * Get a flight by the given uuid
     * @param uuid
     * @returns {*}
     */
    function get(uuid) {
        return http.get(`/api/flights/${uuid}`)
            .then(res => res.data.data, (e) => throwError(e));
    }

    /**
     * Update flight information
     * @param uuid
     * @param data
     * @returns {*}
     */
    function patch(uuid, data) {
        return http.patch(`/api/flights/${uuid}`, data)
            .then(res => res, e => throwError(e));
    }

    /**
     * Create new flight
     * @param data
     * @returns {*}
     */
    function post(data) {
        return http.post(`/api/flights`, data)
            .then(res => res.data.data, e => throwError(e));
    }

    /**
     * Remove a flight
     * @param uuid
     * @returns {*}
     */
    function remove(uuid) {
        return http.delete(`/api/flights/${uuid}`)
            .then(res => res.data.data, e => throwError(e));
    }

    return {paginate, get, patch, post, remove};
};