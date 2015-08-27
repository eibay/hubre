class AddNoteToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :note, :string
  end
end
