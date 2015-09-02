class UsersController < ApplicationController
  skip_before_action :authentication, only: [:index, :create, :login]
  before_action :authentication, only: [:current]
  
  def create
    if User.find_by(email: params[:email])
      render json: {message: "error in signing up"}
    else
      user = User.new(email: params[:email], password: params[:password])
      if user.save
        p "finish saving"
        render json: {message: "success in signing up"}
      end
    end
  end

  def login
    @user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
    if @user
      token = JWT.encode({id: @user.id, exp: 1.day.from_now.to_i}, ENV['SECRET_KEY_BASE'])
      render json: {message: "logged in", token: token}
    else
      render json: {message: "logged in failed"}
    end
  end

  def index
    render json: {message: "alsdfjlkafjs"}
  end

  def current
    p current_user
    render json: {uid: current_user.uid, first_name: current_user.first_name, last_name: current_user.last_name, pic: current_user.pic}
  end
end
