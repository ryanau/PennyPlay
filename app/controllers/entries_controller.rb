class EntriesController < ApplicationController
  before_action :authentication

  def create
    entry = Entry.create(bet_id: params[:bet_id])
    params[:users].each do |user|
      if user[1]["winner"] == "true"
        entry.details.create(winner_id: user[1]["user_id"].to_i)
      else
        entry.details.create(loser_id: user[1]["user_id"].to_i)
      end
    end
    render json: {message: "success"}
  end

  
end
