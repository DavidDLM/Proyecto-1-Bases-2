export const FetchApi = ({ route, body = {}, method = "POST", url }) => {
  const uri = url ? url : "http://localhost:5000/" + route;
  const accessToken = localStorage.getItem("accessToken");
  var bearer = "Bearer " + accessToken;

  let headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Authorization", bearer);
  if (method === "GET") {
    return fetch(uri, {
      method: method,
      withCredentials: true,
      credentials: "include",
      headers: headers,
    });
  } else {
    return fetch(uri, {
      body: JSON.stringify(body),
      method: method,
      withCredentials: true,
      credentials: "include",
      headers: headers,
    });
  }
};
