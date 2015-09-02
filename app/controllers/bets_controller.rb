class BetsController < ApplicationController
  before_action :authentication

  def index
    bets = current_user.bets.includes(:transactions).order(created_at: :desc)
    render json: bets.to_json(
      include: [:transactions]
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

end
