class BetsController < ApplicationController
  before_action :authentication, only: [:index]

  def index
    @bets = Bet.all
    render json: @bets
  end
end
