class UsersController < ApplicationController
  
  # def index
  # 	render :index
  # end

  # def home
  # 	render :home
  # end

  def new
    @user = User.new
  end

  

end