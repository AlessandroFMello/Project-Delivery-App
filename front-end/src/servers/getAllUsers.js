export default async function getAllUsers() {
  const URL = 'http://localhost:3001/user';

  const request = await fetch(URL, {
    method: 'GET',
  });

  const response = await request.json();

  return response;
}
