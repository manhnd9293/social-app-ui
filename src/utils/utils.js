const utils = {
  getUrlParams(name) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    return params?.get(name);
  },

  setUrlParams(name, value) {
    const url = new URL(window.location.href);
    let params = url.searchParams;
    params.set(name, value);
    window.history.replaceState({}, '', `${url.toString()}`)
  },

  upperCaseFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  },
}

export default utils;