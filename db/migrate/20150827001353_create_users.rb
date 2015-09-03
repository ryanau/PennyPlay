class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :uid
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :token
      t.string :pic
      t.string :phone
      t.timestamps null: false
    end
  end
end
