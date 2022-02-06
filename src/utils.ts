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

export const getCurrentDateTime = () => {
  const dt = new Date();
  const DD = `0${dt.getDate()}`.slice(-2);
  const MM = `0${dt.getMonth() + 1}`.slice(-2);
  const YYYY = dt.getFullYear();
  const hh = `0${dt.getHours()}`.slice(-2);
  const mm = `0${dt.getMinutes()}`.slice(-2);
  const ss = `0${dt.getSeconds()}`.slice(-2);

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
};
