export default async function getData(token) {
  const URL = 'http://localhost:3001/login/validate';

  const request = await fetch(URL, {
    method: 'GET',
    headers: {
      Authorization: `${token}`,
    },
  });

  const response = await request.json();

  return response;
}
