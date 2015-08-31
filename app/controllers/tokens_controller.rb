class TokensController < ApplicationController
  def create
    auth_hash = request.env['omniauth.auth']
   
    render :text => auth_hash.inspect
  end
end
