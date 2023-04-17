<script setup>
import {ref} from "vue";
import IconLocked from "@/components/icons/IconLocked.vue";
import {validateForm} from "@/modules/auth/validations/loginForm";
import {usePTechAuth} from "@/services/ptech";
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";

const router = useRouter();
const email = ref('admin@gmail.com'), password = ref('123456'), errors = ref({});
const authError = ref('');

/**
 * Fetch user information
 * @returns {Promise<*>}
 */
async function fetchUserInfo() {
    const res = await usePTechAuth().me();
    useAuthStore().setUser(res.data.data);
    return res;
}

function sendLogin(ctx) {
    // Clean up all error before sending request
    errors.value = {}; authError.value = '';
    usePTechAuth().login(ctx).then(function (res) {
        const accessToken = res.data;
        accessToken.created_at = new Date();
        // Store access token for using later
        useAuthStore().setToken(accessToken);
    }).then(fetchUserInfo).then(function () {
        // Fetch user information and redirect home page
        router.push({name: 'home'})
    }).catch(function (e) {
        // Throw a "NotKnown" error verbiage key
        authError.value = "LoginView.ErrorNotKnown"
    });
}

function submitLogin(e) {
    e.preventDefault();
    validateForm({email, password}).then(sendLogin).catch(e => errors.value = e);
}

</script>

<template>
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                     alt="Your Company">
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ $t('LoginView.SignInTitle') }}</h2>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true">
                <div class="space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="email-address" class="sr-only">{{$t('LoginView.EmailLabel')}}</label>
                        <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required
                               class="relative block w-full rounded-t-md border-0 px-2.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                               :placeholder="$t('LoginView.EmailLabel')">
                        <span v-if="errors.email" class="text-red-500">{{$t(errors.email)}}</span>
                    </div>
                    <div>
                        <label for="password" class="sr-only">{{$t('LoginView.PasswordLabel')}}</label>
                        <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required
                               class="relative block w-full rounded-b-md border-0 px-2.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                               :placeholder="$t('LoginView.PasswordLabel')">
                        <span v-if="errors.password" class="text-red-500">{{$t(errors.password)}}</span>
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox"
                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900">{{$t('LoginView.RememberMeLabel')}}</label>
                    </div>

                    <div class="text-sm">
                        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">{{$t('LoginView.ForgetPassword')}}</a>
                    </div>
                </div>

                <div>
                    <button @click="submitLogin" type="submit"
                            class="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <IconLocked/>
                                </span>
                                {{$t('LoginView.SignInButtonLabel')}}
                    </button>
                    <p v-if="authError" class="text-red-500">{{$t(authError)}}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>

</style>