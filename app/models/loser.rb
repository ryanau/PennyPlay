class Loser < ActiveRecord::Base
  belongs_to :loser, :class_name => "User", :foreign_key => :loser_id
  belongs_to :entry
end
