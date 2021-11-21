export const numberFormatter = new Intl.NumberFormat('en');

export const debounce = (func: any, wait: number) => {
    let timeout: any;

    return function executedFunction(...args: any) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};
