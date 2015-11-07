class AddUserFlightIdToPreferences < ActiveRecord::Migration
  def change
    add_column :preferences, :user_flight_id, :integer
  end
end
