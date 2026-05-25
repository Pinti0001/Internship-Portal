export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://internshala.com/hiring/search'
    );

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to fetch internships',
    });
  }
}