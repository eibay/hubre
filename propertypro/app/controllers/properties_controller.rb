class PropertiesController < ApplicationController

	def index
		properties = Propertie.all
		render json: properties
	end

  def create
    propertie = Propertie.new(propertie_params)
    if propertie.save
      render json: propertie.to_json, status: 201
    else
      render json: { message: 'not ok'}.to_json, status: 422
    end
  end

  def propertie_params

    params.require(:propertie).permit(:label, :address, :latitude, :longitude, :size, :proptype)

  end
  
end