field :coordinates, :type => Array
field :address

class Propertie < ActiveRecord::Base
	belongs_to :user

	def can_delete?(user)
		user.id ==self.user_id
	end

end
