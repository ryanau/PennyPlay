class EntriesController < ApplicationController
  before_action :authentication

  def create
    entry = Entry.create(bet_id: params[:bet_id])
    params[:users].each do |user|
      if user[1]["winner"] == "true"
        detail = entry.details.create(winner_id: user[1]["user_id"].to_i)
      else
        detail = entry.details.create(loser_id: user[1]["user_id"].to_i)
      end
    end
    entry.details.first.update_attributes(approved: true, approved_user_id: current_user.id)

    render json: {message: "Entry created"}
  end

  def approve
    render json: {message: "Detail approved"}
  end

  def pending
    if Bet.find(params[:bet_id]).entries.length != 0
      if Bet.find(params[:bet_id]).entries.last.details.where(approved: false).where.not(approved_user_id: current_user.id).length != 0
          pending = "true"
      else
        pending = "approved"
      end
    else
      pending = "false"
    end
    render json: {pending: pending}

  end

  
end
