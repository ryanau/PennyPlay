class Winner < ActiveRecord::Base
  belongs_to :winner, :class_name => "User", :foreign_key => :winner_id
  belongs_to :entry
end
