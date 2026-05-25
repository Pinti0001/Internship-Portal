export default async function handler(req, res) {
  try {
    const response = await fetch('https://internshala.com/hiring/search', {
      headers: {
        Accept: 'application/json',
        Origin: 'https://internshala.com',
        Referer: 'https://internshala.com/',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream API failed' });
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch internships' });
  }
}
