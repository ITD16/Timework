export default async () => {
  const res = await fetch('https://google.com', { method: 'HEAD' });
  const date = res.headers.get('date');

  return new Response(
    JSON.stringify({ now: date }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
};
