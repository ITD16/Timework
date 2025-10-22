 const clock = document.getElementById('clock');
    const info = document.getElementById('info');
    const timezoneSelect = document.getElementById('timezone');

    let offset = 0;

    async function getServerTime() {
      const start = performance.now();
      const res = await fetch('https://worldtimeapi.org/api/timezone/' + timezoneSelect.value);
      const end = performance.now();
      const latency = (end - start) / 1000;
      const data = await res.json();
      const serverTime = new Date(data.datetime);
      const localTime = new Date();
      offset = serverTime - localTime;
      info.textContent = `Độ trễ: ${(offset / 1000).toFixed(3)} giây`;
    }

    function updateClock() {
      const now = new Date(Date.now() + offset);
      const timeStr = now.toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: timezoneSelect.value
      });
      clock.textContent = timeStr;
    }

    timezoneSelect.addEventListener('change', getServerTime);

    getServerTime();
    setInterval(updateClock, 1000);
    setInterval(getServerTime, 60000);
