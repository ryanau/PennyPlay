require 'twilio-ruby'

module Twilio
  class Twilio
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']

    @client = Twilio::REST::Client.new account_sid, auth_token

    def self
      @client.messages.create(
        from: '+12564742468',
        to: '+162650059826',
        body: 'Hey there!'
      )
    end
  end

end