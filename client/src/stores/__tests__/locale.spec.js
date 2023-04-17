import { setActivePinia, createPinia } from 'pinia'
import {describe, it, expect, beforeEach, afterEach} from "vitest";
import {useLocaleStore} from "@/stores/locale";


describe('Counter Store', () => {
    beforeEach(() => {
        // creates a fresh pinia and make it active so it's automatically picked
        // up by any useStore() call without having to pass it to it:
        // `useStore(pinia)`
        localStorage.removeItem('locale')
        setActivePinia(createPinia())
    })

    afterEach(() => {
        localStorage.removeItem('locale')
    })

    it('setLocale', () => {
        const localeStore = useLocaleStore()
        localeStore.setLocale('ch')
        expect(localeStore.locale).toBe('ch')
    })

    it('getLocale default', () => {
        const localeStore = useLocaleStore()
        expect(localeStore.getLocale()).toBe('en')
    })

    it('getLocale from storage', () => {
        localStorage.setItem('locale', 'vi')
        const localeStore = useLocaleStore()
        expect(localeStore.getLocale()).toBe('vi')
    })
})