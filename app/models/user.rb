class User < ActiveRecord::Base
  validates :email, uniqueness: true
  has_secure_password
  has_many :users_bets
  has_many :bets, through: :users_bets
  has_many :transactions
end
