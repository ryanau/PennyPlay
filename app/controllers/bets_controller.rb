class BetsController < ApplicationController
  before_action :authentication

  def index
    bets = current_user.bets.includes(:entries, :users, entries: [:details]).order(created_at: :desc)
    render json: bets.to_json(
      include: [:entries, :users, :details]
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
end
