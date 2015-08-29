class Bet < ActiveRecord::Base
  has_many :users_bets
  has_many :users, through: :users_bets
  has_many :transactions
end
