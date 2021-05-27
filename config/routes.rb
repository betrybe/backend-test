Rails.application.routes.draw do
  resources :users, only: [:create, :index, :show], path: 'user'
  delete "/user/me", to: "users#destroy"
  
  
  resources :blog_posts, only: [:index, :show, :destroy], path: 'post'
  put "/post/:id", to: "blog_posts#update"

  post "/login", to: "users#login"
  get "/auto_login", to: "users#auto_login"
end
