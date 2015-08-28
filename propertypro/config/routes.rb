Rails.application.routes.draw do

  resources :users 
  resources :properties
  resources :session, only: [:create, :destroy]

end
