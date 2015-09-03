class UsersTransaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :transaction
end
