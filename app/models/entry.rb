class Entry < ActiveRecord::Base
  belongs_to :bet
  
  # has_many :details, dependent: :destroy
  has_many :winners, dependent: :destroy
  has_many :losers, dependent: :destroy
  has_many :confirmations, dependent: :destroy

  # has_many :wins, :class_name => "Detail", :foreign_key => :winner_id
  # has_many :losses, :class_name => "Detail", :foreign_key => :loser_id
end
