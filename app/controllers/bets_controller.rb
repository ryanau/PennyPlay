require 'httparty'
class BetsController < ApplicationController
  before_action :authentication

  def index
    bets = current_user.bets.includes(:entries).order(created_at: :DESC).order('entries.updated_at')
    render json: bets.to_json(
      include: [:entries]
      )
  end

  def create
    bet = current_user.bets.create(name: params[:name])

    render json: {message: "Bet Created", id: bet.id}
  end

  def show
    bet = Bet.find(id: params[:id])
    render json: {data: bet}
  end

  def add_user
    UsersBet.create(user_id: params[:user_id], bet_id: params[:bet_id])
    user = User.find(params[:user_id])
    bet = Bet.find(params[:bet_id])
    twilio_add_to_bet_notification(user.phone, bet.name, current_user.first_name)

    render json: {message: "User Added"}
  end

  def users
    users = Bet.find(params[:bet_id]).users.pluck(:first_name, :last_name, :pic, :phone, :id)
    render json: {data: users}
  end

  def destroy
    Bet.destroy(params[:bet_id])
    render json: {message: "Bet Deleted"}
  end

  def stats
    bet = Bet.find(params[:bet_id])
    stats = []
    bet.users.each do |user|
      stats << ["#{user.first_name}: ", "#{user.wins.count}; "]
    end

    render json: {stats: stats}
  end

  private
  def twilio_add_to_bet_notification(phone, bet_name, adder_name)
    phone = '+1' + phone.to_s
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @client = Twilio::REST::Client.new account_sid, auth_token
    @client.messages.create(
      from: "+14152148230",
      to: phone,
      body: "PennyPlay: #{adder_name} just added you to the challenge #{bet_name}."
    )
  end
end
