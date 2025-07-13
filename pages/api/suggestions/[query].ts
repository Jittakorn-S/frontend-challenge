import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { query } = req.query;
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const geoRes = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );

        if (!geoRes.ok) {
            throw new Error('Failed to fetch geocoding data.');
        }

        const geoData = await geoRes.json();
        res.status(200).json(geoData || []);

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error fetching suggestions';
        res.status(500).json({ message });
    }
}