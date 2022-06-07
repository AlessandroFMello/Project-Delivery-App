export default async function update(id, data, path) {
  const URL = `http://localhost:3001/${path}/${id}`;

  const request = await fetch(URL, {
    method: 'PATCH',
    body: JSON.stringify({ ...data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const response = await request.json();

  return response;
}
