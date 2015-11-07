json.array!(@seats) do |seat|
  json.extract! seat, :id, :flight_id, :row_number, :seat_letter, :free, :color, :label
  json.url seat_url(seat, format: :json)
end
