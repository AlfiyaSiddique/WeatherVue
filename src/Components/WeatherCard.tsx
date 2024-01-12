const WeatherCard:  React.FC<{weatherKey: string, value: string|number}>= ({weatherKey, value}) => {
  return (
  
<div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 w-[20%vw]">

<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ weatherKey.charAt(0).toUpperCase() + weatherKey.slice(1)}</h5>
<p className="font-normal text-gray-700 dark:text-gray-400">{value}{weatherKey === "temp" && "° C"}</p>
</div>

  )
}

export default WeatherCard
