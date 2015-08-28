module SessionHelper
  #logging in of given user
  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user?(user)
    user == current_user
  end

  # Returns the current logged-in user if there is.
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # Returns TRUE if user is logged in.
  def logged_in?
    !current_user.nil?
  end

  def log_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end
  

end
