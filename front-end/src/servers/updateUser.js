export default async function updateUser(id, data) {
  const URL = `http://localhost:3001/user/${id}`;

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
