export default async function create(data, token, path) {
  const URL = `http://localhost:3001/${path}`;

  const request = await fetch(URL, {
    method: 'POST',
    body: JSON.stringify({ ...data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: token,
    },
  });

  const response = await request.json();

  return response;
}
