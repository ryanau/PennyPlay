class User < ActiveRecord::Base
  has_many :users_bets
  has_many :bets, through: :users_bets

  has_many :wins, :class_name => "Winner", :foreign_key => :winner_id
  has_many :losses, :class_name => "Loser", :foreign_key => :loser_id

  has_many :entries, through: :bets
  has_many :confirmations, through: :entries

end
