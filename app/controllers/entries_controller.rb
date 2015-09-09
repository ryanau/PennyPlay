require 'httparty'
class EntriesController < ApplicationController
  skip_before_action :authentication, only: [:sms_approve]
  before_action :authentication, only: [:create, :index, :pending, :approve]

  def create
    entry = Entry.create(bet_id: params[:bet_id])
    params[:users].each do |user|
      if user[1]["winner"] == "true"
        detail = entry.winners.create(winner_id: user[1]["user_id"].to_i, bet_id: params[:bet_id].to_i)
      else
        detail = entry.losers.create(loser_id: user[1]["user_id"].to_i, bet_id: params[:bet_id].to_i)
      end
    end
    entry.confirmations.create(approved: true, user_id: current_user.id)

    bet = Bet.find(params[:bet_id])

    winners_names_arr = []
    bet.entries.last.winners.each do |winner|
      winners_names_arr << winner.winner.first_name
    end
    losers_names_arr = []
    bet.entries.last.losers.each do |loser|
      losers_names_arr << loser.loser.first_name
    end

    winners = ''
    winners_names_arr.each do |winner|
      winners += winner + ' '
    end

    losers = ''
    losers_names_arr.each do |loser|
      losers += loser + ' '
    end

    message = "winners are #{winners}and losers are #{losers}"

    users = bet.users.where.not(id: current_user.id)
    users.each do |user|
      twilio_approve_notification(user.phone, bet.id, bet.name, message)
    end

    render json: {message: "Entry created"}
  end

  def index
    entries = Entry.where(bet_id: params[:bet_id]).includes(:winners, :losers)
    render json: entries.to_json(
      include: [:winners, :losers]
      )
  end

  def pending
    bet = Bet.find(params[:bet_id])
    if bet.entries.count != 0
      if bet.entries.last.confirmations.count != bet.users.count
        if bet.entries.last.confirmations.where(user_id: current_user.id).count != 0
            pending = "approved"
            losers = []
            bet.entries.last.losers.each do |loser|
              losers << loser.loser.first_name
            end
            winners = []
            bet.entries.last.winners.each do |winner|
              winners << winner.winner.first_name
            end
        else
          pending = "true"
          losers = []
          bet.entries.last.losers.each do |loser|
            losers << loser.loser.first_name
          end
          winners = []
          bet.entries.last.winners.each do |winner|
            winners << winner.winner.first_name
          end
        end
      end
    else
      pending = "false"
    end
    render json: {pending: pending, losers: losers, winners: winners}
  end

  def approve
    bet = Bet.find(params[:bet_id])
    if bet.entries.last.confirmations.where(user_id: current_user.id).count == 0
      bet.entries.last.confirmations.create(user_id: current_user.id, approved: true)
    end
    create_venmo_transaction(bet)
    render json: {message: "approved"}
  end

  def sms_approve
    from_input = params[:From]
    from = from_input[2, from_input.length]
    body = params[:Body].upcase

    user = User.find_by(phone: from)
    if body[0,3] == "YES"
      bet_id = body[3, body.length]
      bet = user.bets.where(id: bet_id)[0]

      if bet.entries.last.confirmations.where(user_id: user.id).count == 0
        bet.entries.last.confirmations.create(user_id: user.id, approved: true)
        create_venmo_transaction(bet)
      end

    end
  end

  private

  def create_venmo_transaction(bet)
    if bet.entries.last.confirmations.count == bet.users.count

      winners_uids_arr = []
      bet.entries.last.winners.each do |winner|
        winners_uids_arr << winner.winner.uid
      end

      losers_arr = []
      bet.entries.last.losers.each do |loser|
        losers_arr << [loser.loser.token, loser.loser.phone]
      end

      winners_names_arr = []
      bet.entries.last.winners.each do |winner|
        winners_names_arr << winner.winner.first_name
      end
      losers_names_arr = []
      bet.entries.last.losers.each do |loser|
        losers_names_arr << loser.loser.first_name
      end

      winners = ''
      winners_names_arr.each do |winner|
        winners += winner + ' '
      end

      losers = ''
      losers_names_arr.each do |loser|
        losers += loser + ' '
      end

      bet_name = bet.name

      message = "PennyPlay: Winners are #{winners}and losers are #{losers} for the challenge: #{bet_name}"

      losers_arr.each do |loser|
        winners_uids_arr.each do |winner_uid|
          venmo_post(loser[0], message, winner_uid)
        end
          # twilio_loser_notification(loser[1], bet_name)
      end
    end
  end

  def venmo_post(token, note, user_id)
    p "before post request to venmo"
    HTTParty.post("https://api.venmo.com/v1/payments",
      :body => { "amount" => "0.01", 
                  "access_token" => token,
                  "note" => note,
                  "user_id" => user_id
                }
    )
  end

  def twilio_loser_notification(phone, bet_name)
    phone = '+1' + phone.to_s
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @client = Twilio::REST::Client.new account_sid, auth_token
    @client.messages.create(
      from: "+14152148230",
      to: phone,
      body: "PennyPlay: You just paid the winners for #{bet_name} on Venmo"
    )
  end

  def twilio_approve_notification(phone, bet_id, bet_name, message)
    phone = '+1' + phone.to_s
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @client = Twilio::REST::Client.new account_sid, auth_token
    @client.messages.create(
      from: "+14152148230",
      to: phone,
      body: "PennyPlay: Your friend just created a new entry for #{bet_name}, #{message}- Reply with YES#{bet_id} to approve entry."
    )
  end

end





