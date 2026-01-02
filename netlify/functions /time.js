exports.handler = async function () {
  const res = await fetch('https://google.com', { method: 'HEAD' });
  const date = res.headers.get('date');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ now: date })
  };
};
