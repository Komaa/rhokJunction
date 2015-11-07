class UserFlight < ActiveRecord::Base
	has_one :preference
	has_one :seat
	belongs_to :user
end
