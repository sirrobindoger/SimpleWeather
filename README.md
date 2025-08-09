# Simple Weather Widget

A retro 8-bit style weather widget built with React, displaying current weather conditions, sunrise/sunset times, moon phases, and astronomical data.

## Features

- **Real-time Clock**: Current time display with 7-segment style digits
- **Moon Phases**: Visual representation of 8 moon phases with current phase highlighted
- **Weather Icons**: 8-bit style weather icons with current conditions highlighted  
- **Segment Displays**: Retro 7-segment displays for temperature, humidity, pressure, and wind data
- **Astronomy Data**: Sunrise, sunset, moonrise, and moonset times
- **Responsive Design**: Optimized for desktop viewing with retro aesthetics

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Styling framework
- **SunCalc** - Astronomical calculations
- **SVG Graphics** - Custom 8-bit style icons and moon phases

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Configuration

### Weather API
The app currently uses mock weather data for demonstration. To use real weather data:

1. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Update `src/hooks/useWeather.js` with your API key
3. Uncomment the actual API call and remove the mock data

### Location
By default, the app uses New York coordinates (40.7128, -74.0060). To change the location:
- Modify the default lat/lon parameters in the hook calls in `src/App.jsx`
- Or add geolocation support to get the user's current position

## Project Structure

```
src/
├── components/
│   ├── MoonPhases.jsx      # Moon phase SVG components
│   ├── WeatherIcons.jsx    # Weather condition SVG icons
│   └── SegmentDisplay.jsx  # 7-segment display components
├── hooks/
│   ├── useWeather.js       # Weather data fetching
│   └── useAstronomy.js     # Astronomical calculations
├── App.jsx                 # Main application component
├── main.jsx               # React app entry point
└── index.css              # Global styles and Tailwind
```

## Customization

### Colors
The retro color scheme is defined in `tailwind.config.js`:
- `retro-red`: #ff0000 (active elements)
- `retro-bg`: #1a1a1a (background)
- `retro-gray`: #333333 (inactive elements)

### Display Elements
- **Active Values**: Highlighted in red to match the retro aesthetic
- **Inactive Values**: Shown in gray for contrast
- **Pixelated Graphics**: SVG icons use crisp edges for 8-bit appearance

## Browser Support

- Modern browsers with CSS Grid and SVG support
- Optimized for desktop viewing
- Pixelated rendering may vary by browser

## License

MIT License - feel free to modify and use for your projects!
