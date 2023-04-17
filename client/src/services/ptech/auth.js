/**
 * PTech authentication setup
 * @param http
 * @returns {{me: (function(): *), login: (function(*): *)}}
 */
export default function (http) {

    /**
     * Login with username and password
     * @param credentials
     * @returns {*}
     */
    function login(credentials) {
        return http.post(`/api/auth/login`, credentials);
    }

    /**
     * Fetch information of user currently logged in
     * @returns {*}
     */
    function me() {
        return http.post(`/api/auth/me`);
    }

    return {
        login, me
    };
}