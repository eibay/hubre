class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { message: 'success'}.to_json, status: 201
    else
      render json: { message: 'failure'}.to_json, status: 422
    end
  end

  def user_params
  params.require(:user).permit(:email, :password,
                                :password_confirmation)
  end

end