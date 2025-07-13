import { render, screen } from '@testing-library/react';
import WeatherDetails from './WeatherDetails';
import { WeatherData } from '@/types/weather';

describe('WeatherDetails Component', () => {
    it('renders all weather data correctly', () => {
        const mockData: WeatherData = {
            name: 'London',
            country: 'GB',
            timezone: 3600,
            current: {
                temp: 15.4,
                weather: [{ main: 'Clouds', description: 'overcast clouds', icon: '04d' }],
                humidity: 80,
                pressure: 1012,
                wind_speed: 5,
            },
            daily: [{ temp: { min: 10, max: 20 } }],
            hourly: [],
        };

        render(<WeatherDetails data={mockData} />);


        expect(screen.getByText('London, GB')).toBeInTheDocument();
        expect(screen.getByText(/Local Time:/i)).toBeInTheDocument();
        expect(screen.getByText(/MIN 10°, MAX 20°/i)).toBeInTheDocument();

        expect(screen.getByText('15°')).toBeInTheDocument();
        expect(screen.getByText('Clouds')).toBeInTheDocument();

        expect(screen.getByText('Humidity')).toBeInTheDocument();
        expect(screen.getByText('80%')).toBeInTheDocument();

        expect(screen.getByText('Wind')).toBeInTheDocument();
        expect(screen.getByText('18.0 km/h')).toBeInTheDocument();

        expect(screen.getByText('Pressure')).toBeInTheDocument();
        expect(screen.getByText('1012 mBar')).toBeInTheDocument();
    });
});