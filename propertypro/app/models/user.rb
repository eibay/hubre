class User < ActiveRecord::Base
	has_many :properties, dependendent: :destroy
  before_save   :downcase_email
  
  has_secure_password
end
