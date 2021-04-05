const isDev = /localhost/.test(window.location.href);

export const graphqlLink = isDev
  ? "http://localhost:8001/graphql"
  : "https://tablewise.herokuapp.com/graphql";

export const api = isDev
  ? "http://localhost:8001"
  : "https://tablewise.herokuapp.com";
