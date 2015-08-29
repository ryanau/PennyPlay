class Transaction < ActiveRecord::Base
  belongs_to :users
  belongs_to :bets
end
