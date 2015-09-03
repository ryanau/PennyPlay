class CreateUsersTransactions < ActiveRecord::Migration
  def change
    create_table :users_transactions do |t|
      t.integer :user_id
      t.integer :transaction_id
      t.timestamps null: false
    end
  end
end
