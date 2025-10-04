function App() {
  try {
    const [query, setQuery] = React.useState("");
    const [weather, setWeather] = React.useState(null);
    const API_KEY = "086d9464daddd3ef42fa4f97bcac9b6f";

    const search = async (e) => {
      if (e.key === "Enter") {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
        );
        setWeather(response.data);
        setQuery("");
      }
    };

    return (
      <div className="app">
        <input
          type="text"
          className="search"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
      </div>
    );
  } catch (err) {
    console.error("🔥 Error inside App:", err);
    return <div>Error: {String(err)}</div>;
  }
}
