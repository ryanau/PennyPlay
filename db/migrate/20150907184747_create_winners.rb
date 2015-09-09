class CreateWinners < ActiveRecord::Migration
  def change
    create_table :winners do |t|
      t.integer :winner_id, default: 0
      t.integer :entry_id
      t.integer :bet_id

      t.timestamps null: false
    end
  end
end
