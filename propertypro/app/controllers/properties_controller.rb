class PropertiesController < ApplicationController

	def index
		properties = Propertie.all
		render json: properties
	end

	def create
	end

	def propertie_params
	end

end