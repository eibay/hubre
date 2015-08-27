class User < ActiveRecord::Base
	has_many :properties, dependent: :destroy
  before_save   :downcase_email
  
  has_secure_password

  #Converts email to all lower-case
  def downcase_email
    self.email = email.downcase
  end

end
