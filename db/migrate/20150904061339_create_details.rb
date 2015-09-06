class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.integer :winner_id, default: 0
      t.integer :loser_id, default: 0
      t.integer :entry_id
      t.boolean :approved, default: false
      t.integer :approved_user_id, default: 0

      t.timestamps null: false
    end
  end
end
