class CreateUserFlights < ActiveRecord::Migration
  def change
    create_table :user_flights do |t|
      t.integer :flight_id
      t.integer :preference_id
      t.integer :seat_id
      t.integer :user_id
      t.string :booking_number

      t.timestamps null: false
    end
  end
end
