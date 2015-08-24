class CreateProperties < ActiveRecord::Migration
  def change
    create_table :properties do |t|
      t.string :label
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :type
      t.integer :size

      t.timestamps null: false
    end
  end
end
