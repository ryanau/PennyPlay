class BetsController < ApplicationController
  before_action :authentication, only: [:index]

  def index
    bets = current_user.bets.includes(:transactions)
    render json: bets.to_json(
      include: [:transactions]
    )
  end

end
