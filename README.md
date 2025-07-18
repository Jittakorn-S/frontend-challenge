# Frontend Challenge

## Overview
Create a responsive weather application that allows users to search for cities and view current weather conditions. The app should feature a search box with suggestions, and detailed weather information for selected city in Celsius degree.

# Design Guideline
This is just a guideline. You can adjust or totally redesign it as you see fit.

![image](https://github.com/user-attachments/assets/fc595e44-396e-4108-83a4-0a39f2b2c47c)



# Features
## Main Page
Have 2 main components:
- Search Box: Allows users to search for cities by name or ZIP code
    - Auto-Suggestions: When typing in the search box, display a list of suggested cities based on the input.
- Selected City Weather Details: Display detailed weather information for the selected city, including:
    - Average Temperature (in Celsius)
    - Minimum and Maximum Temperature (in Celsius)
    - Weather Icon
    - Main Weather (e.g., Rain, Snow, Sunny)
    - Weather Description
    - Wind Speed
    - Humidity
    - Pressure
    - Rain Volume
- 24-Hour Forecast: Show a forecast for the next 24 hours, including temperature and weather conditions
- Show local date and time of the user: Display the current date and time for each city in the list.

## Additional Features
- Responsive Design: Ensure the application is responsive and works well on various device sizes.

## Technology Stack
- Use Next.js or React.js for building the user interface.
- Utilize CSS-in-JS solutions (e.g., Styled-Components, Emotion) or CSS frameworks (e.g., Bootstrap, Tailwind CSS) for styling.
- Implement unit tests using a testing framework (e.g., Jest, React Testing Library) to ensure code reliability and quality.
- Use TypeScript to provide static type checking and improve code quality and maintainability.
- Follow best practices for user experience.

## Data Source
### OpenWeather API
https://openweathermap.org/api
### Weather icons
https://openweathermap.org/weather-conditions
### Search by city name API
https://openweathermap.org/api/geocoding-api

You can also choose any other aternative API as your datasource.


## Submission
- Fork this repository, make a pull request to this repo. when you're done an assignment.
- Ensure the code follows best practices and includes comprehensive unit tests.
- Ensure that the project can be run successfully with the provided instructions or setup. We should be able to execute and test your code without any issues.
- Focus on demonstrating your programming skills rather than aiming for a perfect solution. We are more interested in your approach, thought process, and coding practices.




