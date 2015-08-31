class User < ActiveRecord::Base
  validates :email, uniqueness: true
  has_secure_password
  has_many :users_bets
  has_many :bets, through: :users_bets
  has_many :wins, :class_name => "Transaction", :foreign_key => :winner_id
  has_many :losses, :class_name => "Transaction", :foreign_key => :loser_id

end
