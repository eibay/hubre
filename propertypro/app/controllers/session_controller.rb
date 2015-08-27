class SessionController < ApplicationController
  
  # renders new.html.erb from views/session/new.html.erb
  def new
    
  end

  def create
    # @user = User.where(email: params[:email]).first
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      #win - login user
      #render 'win' #temporary text to display
      # binding.pry

      #session[:user_id] is a global variable
      session[:user_id] = user.id

      redirect_to 'index.html' #decide where to go 
    else
     
      render :new
    end

    def destroy
      session[:user_id] = nil
      redirect_to '/login'
    end

  end


end