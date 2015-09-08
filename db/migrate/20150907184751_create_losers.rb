class CreateLosers < ActiveRecord::Migration
  def change
    create_table :losers do |t|
      t.integer :loser_id, default: 0
      t.integer :entry_id

      t.timestamps null: false
    end
  end
end
