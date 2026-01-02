const clock = document.getElementById('clock');
  const TZ = 'Asia/Bangkok';
  const TIME_API = 'https://script.google.com/macros/s/AKfycbzM1cMnmc4e8_xJgxZCjrnvp42mn-TtsR1HtHMt3nxstzHvlNp6OXLOLnQPfwhdyQostQ/exec';

  let baseTime = 0;
  let baseAt = 0;

  async function syncTime() {
    try {
      const res = await fetch(TIME_API);
      const data = await res.json();

      baseTime = new Date(data.now).getTime();
      baseAt = Date.now();
    } catch (e) {
      console.error('Time sync failed', e);
    }
  }

  function updateClock() {
    if (!baseTime) return;

    const now = baseTime + (Date.now() - baseAt);

    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: TZ,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).formatToParts(new Date(now));

    const get = t => parts.find(p => p.type === t).value;
    const timeStr = `${get('hour')}:${get('minute')}:${get('second')}`;

    clock.innerHTML = timeStr
      .split('')
      .map((ch, i) =>
        (i === 2 || i === 5)
          ? `<span style="font-size:12rem">${ch}</span>`
          : `<span>${ch}</span>`
      )
      .join('');
  }

  syncTime();
  setInterval(updateClock, 1000);
  setInterval(syncTime, 5 * 60 * 1000);