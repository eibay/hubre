class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  skip_before_filter :verify_authenticity_token
  
  # ? outputs true or false
  def logged_in?
    !!current_user #smart way of giving the true if true and not just opposite!
  end

  #helper method makes this variable in view and not just on controllers
  helper_method :logged_in?

  def current_user
    User.find_by(id: session[:user_id])
  end

  #helper method makes this variable in view and not just on controllers
  helper_method :current_user

end