class Bet < ActiveRecord::Base
  has_many :users_bets, dependent: :destroy
  has_many :users, through: :users_bets
  has_many :entries, dependent: :destroy
  has_many :details, through: :entries
end
