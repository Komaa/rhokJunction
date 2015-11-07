class CreateSeats < ActiveRecord::Migration
  def change
    create_table :seats do |t|
      t.integer :flight_id
      t.integer :row_number
      t.string :seat_letter
      t.boolean :free
      t.string :color
      t.string :label

      t.timestamps null: false
    end
  end
end
