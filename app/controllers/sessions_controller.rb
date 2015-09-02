class SessionsController < ApplicationController
  def create
    uid = auth_hash.uid
    email = auth_hash.info.email
    first_name = auth_hash.info.first_name
    last_name = auth_hash.info.last_name
    token = params["code"]
    pic = auth_hash.extra.raw_info.profile_picture_url

    user = User.find_by(uid: uid)
    if user
      jwt = JWT.encode({uid: uid, first_name: first_name, last_name: last_name, pic: pic, exp: 1.day.from_now.to_i}, ENV['SECRET_KEY_BASE'])
      query = {jwt: jwt}.to_query
      redirect_to "http://localhost:8080/?#{query}"
    else
      User.create(uid: uid, email: email, first_name: first_name, last_name: last_name, token: token, pic: pic)
      # render json: {info: {uid: uid, first_name: first_name, last_name: last_name, pic: pic}}
      jwt = JWT.encode({uid: uid, first_name: first_name, last_name: last_name, pic: pic, exp: 1.day.from_now.to_i}, ENV['SECRET_KEY_BASE'])
      query = {jwt: jwt}.to_query
      redirect_to "http://localhost:8080/?#{query}"
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
