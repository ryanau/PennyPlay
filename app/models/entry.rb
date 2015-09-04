class Entry < ActiveRecord::Base
  belongs_to :bet
  has_many :details
end
