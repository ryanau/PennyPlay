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

  def pending
    if Bet.find(params[:bet_id]).entries.length != 0
      if Bet.find(params[:bet_id]).entries.last.details.where(approved: true).where(approved_user_id: current_user.id).length != 0

          pending = "approved"

          losers = []
          losers_arr = Bet.find(params[:bet_id]).entries.last.details.where.not(loser_id: 0)
          losers_arr.each do |loser|
            losers << User.find(loser.loser_id)
          end
          
          winners = []
          winners_arr = Bet.find(params[:bet_id]).entries.last.details.where.not(winner_id: 0)
          winners_arr.each do |winner|
            winners << User.find(winner.winner_id)
          end
      else
        pending = "true"

        losers = []
        losers_arr = Bet.find(params[:bet_id]).entries.last.details.where.not(loser_id: 0)
        losers_arr.each do |loser|
          losers << User.find(loser.loser_id)
        end
        
        winners = []
        winners_arr = Bet.find(params[:bet_id]).entries.last.details.where.not(winner_id: 0)
        winners_arr.each do |winner|
          winners << User.find(winner.winner_id)
        end
      end
    else
      pending = "false"
    end
    render json: {pending: pending, losers: losers, winners: winners}
  end

  def approve
    detail = Bet.find(params[:bet_id]).entries.last.details.where(approved: false).where.not(approved_user_id: current_user.id).first
    detail.update_attributes(approved: true, approved_user_id: current_user.id)

    p "before create venmo"
    create_venmo_transaction(params[:bet_id])
    p "after create venmo"
    render json: {message: "approved"}
  end

  private
  def create_venmo_transaction(bet_id)
    if Bet.find(params[:bet_id]).entries.last.details.where(approved: false).length == 0
      winners_uids_arr = User.where(id: Bet.find(params[:bet_id]).entries.last.details.where.not(winner_id: 0).pluck(:winner_id)).pluck(:uid)
      losers_tokens = User.where(id: Bet.find(params[:bet_id]).entries.last.details.where.not(loser_id: 0).pluck(:loser_id)).pluck(:token)

      losers_tokens.each do |loser_token|
        winners_uids_arr.each do |winner_uid|
          venmo_post(loser_token, "test from rau", winner_uid)
        end
      end
    end
  end

  def venmo_post(token, note, user_id)
    p "before post request to venmo"
    HTTParty.post("https://api.venmo.com/v1/payments",
    { 
      :body => [{ "amount" => "0.01", 
                  "access_token" => token,
                  "note" => note,
                  "user_id" => user_id
                }].to_json,
      :headers => { 'Content-Type' => 'application/json', 'Accept' => 'application/json'}
    })
  end
end






