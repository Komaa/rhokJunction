class AddUserFlightIdToSeats < ActiveRecord::Migration
  def change
    add_column :seats, :user_flight_id, :integer
  end
end
