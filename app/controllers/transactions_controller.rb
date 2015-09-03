class TransactionsController < ApplicationController
  before_action :authentication

  def create
    Transaction.create(winner_id: 1, loser_id: 2, bet_id: 1)
  end

  
end
