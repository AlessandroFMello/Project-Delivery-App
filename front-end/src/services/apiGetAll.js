export default async function getAll(path) {
  const URL = `http://localhost:3001/${path}`;

  const request = await fetch(URL, {
    method: 'GET',
  });

  const response = await request.json();

  return response;
}
