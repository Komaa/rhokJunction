json.array!(@user_flights) do |user_flight|
  json.extract! user_flight, :id, :flight_id, :preference_id, :seat_id, :user_id, :booking_number
  json.url user_flight_url(user_flight, format: :json)
end
