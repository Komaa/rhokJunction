class CreatePreferences < ActiveRecord::Migration
  def change
    create_table :preferences do |t|
      t.string :label
      t.string :color

      t.timestamps null: false
    end
  end
end
