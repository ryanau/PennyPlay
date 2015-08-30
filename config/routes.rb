Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]

  resources :bets, only: [:index, :show, :create]
  resources :users, only: [:create, :index]
  post 'login',  to: 'users#login'
  
  match '*all', to: 'client_app#show', via: [:get]
  # get  '*path', to: 'client_app#show'
  # root          to: 'client_app#show'
end
