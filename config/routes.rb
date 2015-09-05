Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]

  scope :api do
    resources :bets, only: [:index, :show, :create, :destroy]
    resources :entries, only: [:create, :index]
    resources :users, only: [:create, :index]
    post '/add_user', :to => 'bets#add_user'
    post '/approve', :to => 'entries#approve'
    get '/pending', :to => 'entries#pending'
    get '/bet_users', :to => 'bets#users'
    get '/current_user', :to => 'users#current'
  end
  post 'login',  to: 'users#login'

  get '/auth/venmo/callback', :to => 'sessions#create'
  get '/auth/failure', :to => 'sessions#failure'
  
  match '*all', to: 'client_app#show', via: [:get]
end
