import * as Browser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

function parseSetCookieHeader(header) {
  const cookieMap = /* @__PURE__ */ new Map();
  const cookies = header.split(", ");
  cookies.forEach((cookie) => {
    const [nameValue, ...attributes] = cookie.split("; ");
    const [name, value] = nameValue.split("=");
    const cookieObj = { value };
    attributes.forEach((attr) => {
      const [attrName, attrValue] = attr.split("=");
      cookieObj[attrName.toLowerCase()] = attrValue;
    });
    cookieMap.set(name, cookieObj);
  });
  return cookieMap;
}
function getSetCookie(header, prevCookie) {
  const parsed = parseSetCookieHeader(header);
  let toSetCookie = {};
  parsed.forEach((cookie, key) => {
    const expiresAt = cookie["expires"];
    const maxAge = cookie["max-age"];
    const expires = expiresAt ? new Date(String(expiresAt)) : maxAge ? new Date(Date.now() + Number(maxAge)) : null;
    toSetCookie[key] = {
      value: cookie["value"],
      expires
    };
  });
  if (prevCookie) {
    try {
      const prevCookieParsed = JSON.parse(prevCookie);
      toSetCookie = {
        ...prevCookieParsed,
        ...toSetCookie
      };
    } catch {
    }
  }
  return JSON.stringify(toSetCookie);
}
function getCookie(cookie) {
  let parsed = {};
  try {
    parsed = JSON.parse(cookie);
  } catch (e) {
  }
  const toSend = Object.entries(parsed).reduce((acc, [key, value]) => {
    if (value.expires && value.expires < /* @__PURE__ */ new Date()) {
      return acc;
    }
    return `${acc}; ${key}=${value.value}`;
  }, "");
  return toSend;
}
function getOrigin(scheme) {
  const schemeURI = Linking.createURL("", { scheme });
  return schemeURI;
}
const expoClient = (opts) => {
  let store = null;
  const cookieName = `${opts?.storagePrefix || "better-auth"}_cookie`;
  const localCacheName = `${opts?.storagePrefix || "better-auth"}_session_data`;
  const storage = opts?.storage;
  const isWeb = Platform.OS === "web";
  const rawScheme = opts?.scheme || Constants.expoConfig?.scheme || Constants.platform?.scheme;
  const scheme = Array.isArray(rawScheme) ? rawScheme[0] : rawScheme;
  if (!scheme && !isWeb) {
    throw new Error(
      "Scheme not found in app.json. Please provide a scheme in the options."
    );
  }
  return {
    id: "expo",
    getActions(_, $store) {
      store = $store;
      return {
        /**
         * Get the stored cookie.
         *
         * You can use this to get the cookie stored in the device and use it in your fetch
         * requests.
         *
         * @example
         * ```ts
         * const cookie = client.getCookie();
         * fetch("https://api.example.com", {
         * 	headers: {
         * 		cookie,
         * 	},
         * });
         */
        getCookie: () => {
          const cookie = storage.getItem(cookieName);
          return getCookie(cookie || "{}");
        }
      };
    },
    fetchPlugins: [
      {
        id: "expo",
        name: "Expo",
        hooks: {
          async onSuccess(context) {
            if (isWeb) return;
            const setCookie = context.response.headers.get("set-cookie");
            if (setCookie) {
              const prevCookie = await storage.getItem(cookieName);
              const toSetCookie = getSetCookie(
                setCookie || "",
                prevCookie ?? void 0
              );
              await storage.setItem(cookieName, toSetCookie);
              store?.notify("$sessionSignal");
            }
            if (context.request.url.toString().includes("/get-session") && !opts?.disableCache) {
              const data = context.data;
              storage.setItem(localCacheName, JSON.stringify(data));
            }
            if (context.data?.redirect && context.request.url.toString().includes("/sign-in") && !context.request?.body.includes("idToken")) {
              const callbackURL = JSON.parse(context.request.body)?.callbackURL;
              const to = callbackURL;
              const signInURL = context.data?.url;
              const result = await Browser.openAuthSessionAsync(signInURL, to);
              if (result.type !== "success") return;
              const url = new URL(result.url);
              const cookie = String(url.searchParams.get("cookie"));
              if (!cookie) return;
              storage.setItem(cookieName, getSetCookie(cookie));
              store?.notify("$sessionSignal");
            }
          }
        },
        async init(url, options) {
          if (isWeb) {
            return {
              url,
              options
            };
          }
          options = options || {};
          const storedCookie = storage.getItem(cookieName);
          const cookie = getCookie(storedCookie || "{}");
          options.credentials = "omit";
          options.headers = {
            ...options.headers,
            cookie,
            "expo-origin": getOrigin(scheme)
          };
          if (options.body?.callbackURL) {
            if (options.body.callbackURL.startsWith("/")) {
              const url2 = Linking.createURL(options.body.callbackURL, {
                scheme
              });
              options.body.callbackURL = url2;
            }
          }
          if (options.body?.newUserCallbackURL) {
            if (options.body.newUserCallbackURL.startsWith("/")) {
              const url2 = Linking.createURL(options.body.newUserCallbackURL, {
                scheme
              });
              options.body.newUserCallbackURL = url2;
            }
          }
          if (options.body?.errorCallbackURL) {
            if (options.body.errorCallbackURL.startsWith("/")) {
              const url2 = Linking.createURL(options.body.errorCallbackURL, {
                scheme
              });
              options.body.errorCallbackURL = url2;
            }
          }
          if (url.includes("/sign-out")) {
            await storage.setItem(cookieName, "{}");
            store?.atoms.session?.set({
              data: null,
              error: null,
              isPending: false
            });
            storage.setItem(localCacheName, "{}");
          }
          return {
            url,
            options
          };
        }
      }
    ]
  };
};

export { expoClient, getCookie, getSetCookie, parseSetCookieHeader };
