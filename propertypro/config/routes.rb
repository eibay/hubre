Rails.application.routes.draw do
 
 # Controller : Action

# USERS
 get '/' => 'users#index' #index page
 get '/home' => 'users#home' #rerouting to home once logged in

 # post '/' => 'users#login' #login action
 # post '/' => 'users#create' #create a new user

# Properties

 # post '/property/new' => 'properties#create'
 # get '/property/:id' => 'properties#show'
 # put  'property/edit' => 'properties#edit'

  resources :users 
  resources :properties

end
