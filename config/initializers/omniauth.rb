Rails.application.config.middleware.use OmniAuth::Builder do
  provider :venmo, ENV['VENMO_CLIENT_ID'], ENV['VENMO_CLIENT_SECRET'], :scope => 'access_friends,access_phone,access_profile,make_payments,access_email'
end