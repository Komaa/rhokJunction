class RemovePreferenceIdFromUserFlights < ActiveRecord::Migration
  def change
  	remove_column :user_flights, :preference_id

  end
end
