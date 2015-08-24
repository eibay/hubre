class Propertie < ActiveRecord::Base
	belongss_to :user

	def can_delete?(user)
		user.id ==self.user_id
	end

end
