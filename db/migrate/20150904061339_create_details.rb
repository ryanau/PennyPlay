class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.integer :winner_id
      t.integer :loser_id
      t.integer :entry_id
      t.boolean :approved, default: false
      t.integer :approved_user_id

      t.timestamps null: false
    end
  end
end
