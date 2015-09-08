class SessionsController < ApplicationController
  def create
    p auth_hash
    uid = auth_hash.uid
    email = auth_hash.info.email
    first_name = auth_hash.info.first_name
    last_name = auth_hash.info.last_name
    if auth_hash.info.phone.length != 10
      phone = auth_hash.info.phone[1..-1]
    end
    token = auth_hash.credentials.token
    pic = auth_hash.extra.raw_info.profile_picture_url

    user = User.find_by(uid: uid)
    if user
      user.update_attributes(token: token)
      jwt = JWT.encode({uid: uid, first_name: first_name, last_name: last_name, pic: pic, exp: 1.day.from_now.to_i}, ENV['SECRET_KEY_BASE'])
      query = {jwt: jwt}.to_query
      redirect_to "https://pennyplay.herokuapp.com/?#{query}"
      # redirect_to "http://localhost:8080/?#{query}"
    else
      User.create(uid: uid, email: email, first_name: first_name, last_name: last_name, token: token, pic: pic, phone: phone)
      jwt = JWT.encode({uid: uid, first_name: first_name, last_name: last_name, pic: pic, exp: 1.day.from_now.to_i}, ENV['SECRET_KEY_BASE'])
      query = {jwt: jwt}.to_query
      redirect_to "https://pennyplay.herokuapp.com/?#{query}"
      # redirect_to "http://localhost:8080s/?#{query}"
    end
  end

  private

  def auth_hash
    request.env['omniauth.auth']
  end
end
