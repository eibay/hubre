Rails.application.routes.draw do
 
 # Controller : Action

# USERS
 get '/' => 'users#index' #index page
 get '/home' => 'users#home' #rerouting to home once logged in

 post '/' => 'users#login' #login action
 post '/' => 'users#create' #create a new user

# Properties

 # post '/property/new' => 'property#create'
 # get '/property/:id' => 'property#show'
 # put  'property/edit' => 'property#edit'

  resources :users #need to create the data bases

end
