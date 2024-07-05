import queryString from "query-string";
import slugify from "slugify";

export const sendRequest = async <T>(props: IRequest) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }),
    body: body ? JSON.stringify(body) : null,
    ...nextOption,
  };
  // console.log("🚀 ~ sendRequest ~ options:", options)
  if (useCredentials) options.credentials = "include";
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T;
    } else {
      return res.json().then(function (json) {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

export const sendRequestFile = async <T>(props: IRequest) => {
  let {
    url,
    method,
    body,
    queryParams = {},
    useCredentials = false,
    headers = {},
    nextOption = {},
  } = props;

  const options: any = {
    method: method,
    headers: new Headers({
      ...headers,
    }),
    body: body ? body : null,
    ...nextOption,
  };
  // console.log("🚀 ~ sendRequest ~ options:", options)
  if (useCredentials) options.credentials = "include";
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }
  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json() as T;
    } else {
      return res.json().then(function (json) {
        return {
          statusCode: res.status,
          message: json?.message ?? "",
          error: json?.error ?? "",
        } as T;
      });
    }
  });
};

export const fetchDefaultImages = (type: string) => {
  if (type === "GITHUB") return "/user/default-github.png";
  if (type === "GOOGLE") return "/user/default-google.png";
  return "/user/default-user.png";
};

export const convertSlugURL = (str: string) => {
  if (!str) {
    return "";
  }
  str = slugify("Lệ Lưu Ly", {
    lower: true,
    locale: "vi",
  });
  return str;
};
