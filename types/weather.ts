export interface HourlyForecast {
    dt: number;
    main: {
        temp: number;
    };
    weather: {
        icon: string;
        description: string;
    }[];
}

export interface WeatherData {
    name: string;
    country: string;
    timezone: number; 
    current: {
        temp: number;
        weather: {
            main: string;
            description: string;
            icon: string;
        }[];
        humidity: number;
        pressure: number;
        wind_speed: number;
        rain?: {
            '1h': number;
        };
    };
    daily: {
        temp: {
            min: number;
            max: number;
        };
    }[];
    hourly: HourlyForecast[];
}