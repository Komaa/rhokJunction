class RemoveFlightIdAndSeatIdFromUserFlights < ActiveRecord::Migration
  def change
  	remove_column :user_flights, :flight_id
  	remove_column :user_flights, :seat_id
  end
end
