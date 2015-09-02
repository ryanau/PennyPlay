class User < ActiveRecord::Base
  # validates :email, uniqueness: true
  # has_secure_password

  # def self.create_with_omniauth(auth)
  #   create! do |user|
  #     user.provider = auth["provider"]
  #     user.uid = auth["uid"]
  #     user.name = auth["info"]["name"]
  #   end
  # end

  has_many :users_bets
  has_many :bets, through: :users_bets
  has_many :wins, :class_name => "Transaction", :foreign_key => :winner_id
  has_many :losses, :class_name => "Transaction", :foreign_key => :loser_id

end
