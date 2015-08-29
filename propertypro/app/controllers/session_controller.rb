class SessionController < ApplicationController
  
  # renders new.html.erb from views/session/new.html.erb
  def new
    
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])

      #session[:user_id] is a global variable
      session[:user_id] = user.id
      
      render json: { message: 'success'}.to_json, status: 201
    else
      render json: { message: 'failure'}.to_json, status: 422
    end

  end

  def destroy
    session[:user_id] = nil
    render json: { message: 'success'}.to_json, status: 201
  end
  
end