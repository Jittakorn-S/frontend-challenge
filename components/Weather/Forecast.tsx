import Image from 'next/image';

interface HourlyForecast {
    dt: number;
    main: {
        temp: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
}

interface ForecastProps {
    data: HourlyForecast[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
    return (
        <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xs font-semibold text-black uppercase mb-3">24 HOURS FORECAST</h3>
            <div className="flex justify-between text-center overflow-x-auto space-x-4">
                {data?.slice(0, 6).map((hour, index) => (
                    <div key={index} className="flex-shrink-0 text-black">
                        <p className="text-xs uppercase font-light">
                            {hour?.dt ? new Date(hour.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }) : 'N/A'}
                        </p>
                        {hour?.weather?.[0]?.icon && (
                            <div className="w-10 h-10 mx-auto my-2">
                                <Image
                                    src={`http://openweathermap.org/img/wn/${hour.weather?.[0]?.icon}.png`}
                                    alt={hour.weather?.[0]?.description || 'Weather icon'}
                                    width={40}
                                    height={40}
                                />
                            </div>
                        )}
                        <p className="font-semibold text-sm">{hour?.main?.temp ? `${Math.round(hour.main.temp)}°` : 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;