export default async function getUserById(id) {
  const URL = `http://localhost:3001/user/${id}`;

  const request = await fetch(URL, {
    method: 'GET',
  });

  const response = await request.json();

  return response;
}
