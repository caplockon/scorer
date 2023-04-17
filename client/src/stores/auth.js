import {defineStore} from "pinia";
import {ref} from "vue";

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken'
const USER_STORAGE_KEY = 'user'

let initialToken, initialUser;
try {initialToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY))}
catch (e) {}
try {initialUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY))}
catch (e) {}

export const useAuthStore = defineStore('auth', () => {
    const user = ref(initialUser);
    const token = ref(initialToken);

    function isTokenExpired() {
        const createdAt = !!token.value ? token.value.created_at : null
        const expiresIn = !!token.value ? token.value.expires_in : null

        if (!!createdAt && !!expiresIn) {
            const ttl = Math.ceil(((new Date()).getTime() - Date.parse(createdAt)) / 1000);
            return !(ttl < (expiresIn - 5 * 60))
        }

        return true;
    }

    function isLoggedIn() {
        return !!token.value && !isTokenExpired();
    }

    function setToken(tokenValue) {
        localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, JSON.stringify(token.value = tokenValue));
    }

    function setUser(userValue) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.value = userValue));
    }

    function unsetToken() {
        token.value = null;
        localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    }

    function unsetUser() {
        user.value = null;
        localStorage.removeItem(USER_STORAGE_KEY);
    }

    function unsetAll() {
        unsetToken();
        unsetUser();
    }

    function getTokenString(includeType = true) {

        const tokenString = isLoggedIn() ? token.value.access_token : null;

        if (!! tokenString) {
            return includeType ? `Bearer ${tokenString}` : tokenString;
        }

        return null;
    }

    function getUser() {
        return user.value;
    }

    return {
        user, token, isLoggedIn, setToken, setUser, unsetAll, getTokenString, getUser
    }
})