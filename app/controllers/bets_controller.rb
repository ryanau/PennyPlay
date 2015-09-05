class BetsController < ApplicationController
  # include Twilio
  before_action :authentication

  def index
    bets = current_user.bets.includes(:entries, :users, entries: [:details]).order(created_at: :DESC).order('entries.updated_at')
    render json: bets.to_json(
      include: [:entries, :users, :details]
    )
  end

  def create
    bet = current_user.bets.create(name: params[:name])

    # twilio(current_user.phone)

    render json: {message: "Bet Created", id: bet.id}
  end

  def show
    bet = Bet.find(id: params[:id])
    render json: {data: bet}
  end

  def add_user
    UsersBet.create(user_id: params[:user_id], bet_id: params[:bet_id])
    render json: {message: "User Added"}
  end

  def users
    users = Bet.find(params[:bet_id]).users
    render json: {data: users}
  end

  def destroy
    Bet.destroy(params[:bet_id])
    render json: {message: "Bet Deleted"}
  end

  private
  def twilio(phone)
    phone = '+1' + phone.to_s
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    @client = Twilio::REST::Client.new account_sid, auth_token
    @client.messages.create(
      from: '+12564742468',
      to: phone,
      body: 'sup bitch!'
    )
  end
end
