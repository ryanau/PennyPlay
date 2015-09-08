class CreateConfirmations < ActiveRecord::Migration
  def change
    create_table :confirmations do |t|
      t.boolean :approved, default: false
      t.integer :entry_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
