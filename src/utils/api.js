export async function api(url, method, body) {
  const token = localStorage.getItem('token');
  return await fetch('http://localhost:3200' + url, {
    method: method,
    headers: {
      Authorization: token,
    },
    body: body,
  });
}

export async function jsonApi(url, method, bodyJson) {
  const token = localStorage.getItem('token');
  return await fetch('http://localhost:3200' + url, {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyJson),
  });
}
