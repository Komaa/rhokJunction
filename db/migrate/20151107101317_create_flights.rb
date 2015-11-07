class CreateFlights < ActiveRecord::Migration
  def change
    create_table :flights do |t|
      t.string :departure
      t.string :destination
      t.date :date
      t.datetime :departure_time

      t.timestamps null: false
    end
  end
end
