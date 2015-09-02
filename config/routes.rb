Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]

  resources :bets, only: [:index, :show, :create]
  resources :users, only: [:create, :index]
  post 'login',  to: 'users#login'

  get '/current_user', :to => 'users#current'

  get '/auth/venmo/callback', :to => 'sessions#create'
  get '/auth/failure', :to => 'sessions#failure'
  
  match '*all', to: 'client_app#show', via: [:get]
end
