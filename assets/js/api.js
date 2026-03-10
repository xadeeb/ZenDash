// Weather logic using wttr.in or OpenWeather
export async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return {
            temp: data.current_condition[0].temp_C,
            desc: data.current_condition[0].weatherDesc[0].value,
            city: city
        };
    } catch (error) {
        console.error("API Fetch Error:", error);
        return null;
    }
}