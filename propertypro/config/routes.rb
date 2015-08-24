Rails.application.routes.draw do
 
 # Controller : Action

# USERS
 get '/' => 'users#index'
 post '/home' => 'user#home'

# Properties

 post '/property/new' => 'property#create'
 get '/property/:id' => 'property#show'
 put  'property/edit' => 'property#edit'

  resourses : users #need to create the data bases

end
