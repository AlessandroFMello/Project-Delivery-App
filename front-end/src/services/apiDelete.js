export default async function deleteById(id, path) {
  const URL = `http://localhost:3001/${path}/${id}`;

  const request = await fetch(URL, {
    method: 'DELETE',
  });

  const response = await request.json();

  return response;
}
