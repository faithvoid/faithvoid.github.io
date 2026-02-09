async function setRandomBackground() {
  const readmeURL = 'https://raw.githubusercontent.com/dconnolly/chromecast-backgrounds/refs/heads/master/README.md';

  const res = await fetch(readmeURL);
  const text = await res.text();

  let urls = Array.from(
    text.matchAll(/!\[\]\((.*?)\)/g),
    m => m[1]
  );

  urls = urls.sort(() => Math.random() - 0.5);

  for (const url of urls) {
    try {
      const imgRes = await fetch(url, { method: 'GET' });

      if (!imgRes.ok) continue;

      const contentType = imgRes.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) continue;

      const blob = await imgRes.blob();
      const objectURL = URL.createObjectURL(blob);

      document.body.style.backgroundImage = `url('${objectURL}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';

      return; 
    } catch {
      continue;
    }
  }

  console.warn('No valid background images found.');
}

setRandomBackground();
