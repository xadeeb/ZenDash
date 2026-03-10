export async function getWeatherData(city = 'Moradabad') {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) throw new Error("API Limit or Network Error");
        const data = await response.json();
        return {
            temp: data.current_condition[0].temp_C,
            desc: data.current_condition[0].weatherDesc[0].value
        };
    } catch (err) {
        console.error("Weather Service Error:", err);
        return null;
    }
}