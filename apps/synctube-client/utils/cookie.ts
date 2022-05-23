import Cookies from 'js-cookie';

type setCookieOpts = {
  isSession: boolean;
};

export function setCookie(
  name: string,
  value: string,
  opts: setCookieOpts = { isSession: true },
) {
  Cookies.set(name, value, {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    ...(opts.isSession ? {} : { expires: 360 }),
  });
}

export function removeCookie(name: string) {
  Cookies.remove(name);
}
