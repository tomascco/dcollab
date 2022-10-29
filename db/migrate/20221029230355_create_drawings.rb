class CreateDrawings < ActiveRecord::Migration[7.0]
  def change
    create_table :drawings do |t|
      t.string :name
      t.integer :width
      t.integer :height
      t.jsonb :objects

      t.timestamps
    end
  end
end
