interface WeatherHeaderProps {
  name: string;
}

const WeatherHeader: React.FC<WeatherHeaderProps> = ({ name }) => {
  return (
    <h1 className="text-white text-3xl max-sm:text-xl">{name}</h1>
  )
}

export default WeatherHeader;