export default async function deleteUser(id) {
  const URL = `http://localhost:3001/user/${id}`;

  const request = await fetch(URL, {
    method: 'DELETE',
  });

  const response = await request.json();

  return response;
}
