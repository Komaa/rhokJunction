class Seat < ActiveRecord::Base
	belongs_to :flight
	belongs_to :user_flight
end
