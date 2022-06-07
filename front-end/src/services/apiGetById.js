export default async function getUserById(id, path) {
  const URL = `http://localhost:3001/${path}/${id}`;

  const request = await fetch(URL, {
    method: 'GET',
  });

  const response = await request.json();

  return response;
}
