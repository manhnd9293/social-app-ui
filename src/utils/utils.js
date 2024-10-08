import defaultAvatar from '../../src/common/img/defaultAvatar.jpg'
import {DateTime} from 'luxon';

const utils = {
  getUrlQueryParams(queryList) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const ans = {}
    for (let item of queryList) {
      ans[item] = params?.get(item);
    }
    return ans;
  },

  getUrlQueryParam(name) {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    return params.get(name) || '';
  },

  getUrlQueryParamsFromRequest(request, queryList) {
    const url = new URL(request.url);
    const params = url.searchParams;
    const ans = {}
    for (let item of queryList) {
      ans[item] = params?.get(item);
    }
    return ans;
  },


  setUrlParams(name, value) {
    const url = new URL(window.location.href);
    let params = url.searchParams;
    params.set(name, value);
    window.history.replaceState({}, '', `${url.toString()}`)
  },


  createQueryString(queryObject) {
    let ans = '?';
    for (let key in queryObject) {
      if (queryObject[key]) {
        ans += `${key}=${queryObject[key]}&`;
      }
    }

    return ans.substring(0, ans.length - 1);
  },

  upperCaseFirst(str) {
    return str[0].toUpperCase() + str.slice(1);
  },

  converUrlString(str) {
    return str.split('')
  },

  getErrorMessage(error) {
    if(!error) return;
    if (error.code === 'ERR_NETWORK') {
      return error.message;
    } else {
      return error.response?.data?.message || 'Something went wrong';
    }
  },

  getBackgroundImageStyle(url) {
    return {
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }
  },

  navLinkActive: ({isActive}) =>
    isActive ? 'is-active' : undefined,

  defaultAvatar: defaultAvatar,

  objectId: function () {
    return this.hex(Date.now() / 1000) +
      ' '.repeat(16).replace(/./g, () => this.hex(Math.random() * 16))
  },

  hex: function (value) {
    return Math.floor(value).toString(16)
  },

  showTimeDistanceFromNow(date) {
    const from = DateTime.fromISO(date);
    const {days, hours, minutes} = DateTime.now().diff(from, ['days', 'hours', 'minutes']).toObject();
    if (hours < 1) {
      return `${Math.floor(minutes)}m`
    } else if(days <= 0) {
      return `${Math.floor(hours)}h`
    } else if (days <=1 ) {
      return 'Yesterday'
    } else if(days <= 7) {
      return `${days}d`
    } else {
      return from.toFormat('dd MMMM yyyy');
    }
  },

  getStyleForImageBackground(url) {
   return {
     backgroundImage: `url(${url})`,
     backgroundRepeat: 'none',
     backgroundSize: 'cover',
     backgroundPosition: 'center'
   }
  },
}

export default utils;