class CreateTransactions < ActiveRecord::Migration
  def change
    create_table :transactions do |t|
      t.integer :winner_id
      t.integer :loser_id

      t.integer :bet_id
      t.timestamps null: false
    end
  end
end
