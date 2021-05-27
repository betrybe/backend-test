Rails.application.routes.draw do
  resources :users, only: [:create, :index, :show], path: 'user'
  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
end
