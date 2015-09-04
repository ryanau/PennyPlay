class Bet < ActiveRecord::Base
  has_many :users_bets
  has_many :users, through: :users_bets
  has_many :entries
  has_many :details, through: :entries
end
