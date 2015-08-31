Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]

  resources :bets, only: [:index, :show, :create]
  resources :users, only: [:create, :index]
  post 'login',  to: 'users#login'

  get '/auth/:provider/callback', :to => 'tokens#create'
  get '/auth/failure', :to => 'tokens#failure'
  
  match '*all', to: 'client_app#show', via: [:get]
end
