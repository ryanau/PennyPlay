class ClientAppController < ApplicationController
  def show
    render file: 'public/index.html'
  end
end
