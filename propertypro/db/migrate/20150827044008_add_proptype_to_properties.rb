class AddProptypeToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :proptype, :string
  end
end
