json.array!(@flights) do |flight|
  json.extract! flight, :id, :departure, :destination, :date, :departure_time
  json.url flight_url(flight, format: :json)
end
