import {create as createI18n} from "@/i18n";
import {create as createRouter} from "@/router";
import modules from "@/modules";

const localeSetup = {en: {}, vi: {}};
const routerSetup = {routes: [], beforeEach: [], afterEach: []};

/**
 * Install locale translator for module
 * @param module
 */
function installLocale(module) {
    const moduleLocale = !!module.locale ? module.locale : {en: {}, vi: {}};

    // Support en, vi for now
    ['en', 'vi'].map(locale => {
        if (!!moduleLocale && moduleLocale.hasOwnProperty(locale)) {
            localeSetup[locale] = Object.assign(localeSetup[locale], moduleLocale[locale]);
        }
    });
}

/**
 * Install module router
 * @param module
 */
function installRouter(module) {
    const moduleRouter = !!module.router ? module.router : {routes: [], beforeEach: [], afterEach: []};

    // Install routes
    if (!!moduleRouter.routes) {
        routerSetup.routes = routerSetup.routes.concat(moduleRouter.routes);
    }

    // Register hook `beforeEach`
    if (!!moduleRouter.beforeEach) {
        routerSetup.beforeEach = routerSetup.beforeEach.concat(moduleRouter.beforeEach);
    }

    // Register hook `afterEach`
    if (!!moduleRouter.afterEach) {
        routerSetup.afterEach = routerSetup.afterEach.concat(moduleRouter.afterEach);
    }
}

for (let i = 0; i < modules.length; i++) {
    let module = modules[i];
    installLocale(module);
    installRouter(module);
}

export const i18n = createI18n(localeSetup);

export const router = createRouter(routerSetup);

export default {};