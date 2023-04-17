const sizes = {
    small: {},
    regular: {},
    large: {}
};

const states = {
    disabled: {},
    regular: {},
    error: {}
};

function setup(input) {

    var normalize = function (classes) {
        return Array.isArray(classes) ? classes.join(' ') : classes;
    }

    return {
        regularSize(classes) {
            sizes.regular[input] = normalize(classes);
            return this;
        },
        largeSize(classes) {
            sizes.large[input] = normalize(classes);
            return this;
        },

        smallSize(classes) {
            sizes.small[input] = normalize(classes);
            return this;
        },

        regularState(classes)  {
            states.regular[input] = normalize(classes);
            return this;
        },

        disabledState(classes) {
            states.disabled[input] = normalize(classes);
            return this;
        },

        errorState(classes) {
            states.error[input] = normalize(classes);
            return this;
        }
    };
}

setup('InputText')
    .regularSize('border text-sm rounded-lg block w-full p-2.5')
    .regularState([
        'text-gray-900 bg-gray-50 border-gray-300',
        'focus:ring-blue-500 focus:border-blue-500',
        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
        'dark:focus:ring-blue-500 dark:focus:border-blue-500',
    ])
    .errorState([
        'bg-red-50 border-red-500 text-red-900 placeholder-red-700',
        'focus:ring-red-500 focus:border-red-500',
        'dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
    ])
    .disabledState([
        'bg-gray-100 border border-gray-300 text-gray-900 cursor-not-allowed',
        'focus:ring-blue-500 focus:border-blue-500',
        'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400',
        'dark:focus:ring-blue-500 dark:focus:border-blue-500'
    ]);

setup('InputLabel')
    .regularSize('block mb-2 text-sm font-medium')
    .regularState('text-gray-900 dark:text-white')
    .errorState('text-red-700 dark:text-red-500');

setup('InputErrorText')
    .regularSize('block mt-2 text-sm')
    .errorState('text-red-700 dark:text-red-500');

setup('InputButton')
    .regularSize('font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2')
    .regularState([
        'text-white bg-blue-700',
        'hover:bg-blue-800 focus:ring-4 focus:ring-blue-300',
        'dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
    ]);


export const determineState = function (disabled, error) {
    if (disabled) {
        return 'disabled';
    }

    if (!!error) {
        return 'error';
    }

    return 'regular';
};

export const getStateClasses = function (state, type) {
    return states[state][type] ?? '';
}

export const determineSize = function (size) {
    if (size === "lg") {
        return 'large';
    }

    if (size === "sm") {
        return 'small';
    }

    return 'regular';
};

export const getSizeClasses = function (size, type) {
    const sizeName = determineSize(size);
    return sizes[sizeName][type] ?? '';
};

export const getClasses = function (type, options) {
    const state = determineState(!!options.disabled, options.error ?? '');
    const size = determineSize(options.size ?? 'regular');

    return [
        getSizeClasses(size, type),
        getStateClasses(state, type)
    ];
};

export const sizeEnums = ['lg', 'sm', 'md'];