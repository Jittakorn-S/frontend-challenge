import { WeatherData } from '@/types/weather';

const getLocalTime = (timezoneOffset: number): string => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (timezoneOffset * 1000));

    return localTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
    const { current, daily, name, country, timezone } = data;

    return (
        <>
            <div className="text-left mb-6">
                <h1 className="text-2xl font-semibold text-black">{name}, {country}</h1>
                <p className="text-black text-sm font-light">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · Local Time: {getLocalTime(timezone)}
                </p>
                <p className="text-black text-xs mt-1 font-light">
                    MIN {daily?.[0]?.temp?.min ? `${Math.round(daily[0].temp.min)}°` : 'N/A'}, MAX {daily?.[0]?.temp?.max ? `${Math.round(daily[0].temp.max)}°` : 'N/A'}
                </p>
            </div>
            <div className="text-center my-8">
                <p className="text-7xl font-light tracking-tight text-black">{current?.temp ? Math.round(current.temp) : 'N/A'}°</p>
                <p className="text-black text-lg mt-2">{current?.weather?.[0]?.main}</p>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-xs font-semibold text-black uppercase mb-3">CURRENT DETAILS</h3>
                <div className="space-y-2 text-sm text-black">
                    <div className="flex justify-between"><span className="font-light">Humidity</span><span className="font-light">{current?.humidity ? `${current.humidity}%` : 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="font-light">Wind</span><span className="font-light">{current?.wind_speed ? `${(current.wind_speed * 3.6).toFixed(1)} km/h` : 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="font-light">Pressure</span><span className="font-light">{current?.pressure ? `${current.pressure} mBar` : 'N/A'}</span></div>
                    <div className="flex justify-between"><span className="font-light">Chance of rain</span><span className="font-light">{current?.rain?.['1h'] ? `${current.rain['1h']} mm` : '0%'}</span></div>
                </div>
            </div>
        </>
    );
};

export default WeatherDetails;