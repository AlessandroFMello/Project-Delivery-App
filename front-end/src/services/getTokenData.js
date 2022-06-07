export default async function getTokenData(token) {
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
