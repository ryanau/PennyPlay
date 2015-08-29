Rails.application.routes.draw do
  match '*all', to: 'application#cors_preflight_check', via: [:options]
  resources :bets, only: [:index]
  resources :users, only: [:create, :index]
  post 'login',  to: 'users#login'
end
