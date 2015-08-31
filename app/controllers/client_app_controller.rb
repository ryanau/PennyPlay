class ClientAppController < ApplicationController
  def show
    p "show"
    render file: 'public/index.html'
  end
end
