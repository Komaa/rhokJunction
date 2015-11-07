class UserFlightsController < ApplicationController
  before_action :set_user_flight, only: [:show, :edit, :update, :destroy]

  # GET /user_flights
  # GET /user_flights.json
  def index
    @user_flights = UserFlight.all
  end

  # GET /user_flights/1
  # GET /user_flights/1.json
  def show
  end

  # GET /user_flights/new
  def new
    @user_flight = UserFlight.new
  end

  # GET /user_flights/1/edit
  def edit
  end

  # POST /user_flights
  # POST /user_flights.json
  def create
    @user_flight = UserFlight.new(user_flight_params)

    respond_to do |format|
      if @user_flight.save
        format.html { redirect_to @user_flight, notice: 'User flight was successfully created.' }
        format.json { render :show, status: :created, location: @user_flight }
      else
        format.html { render :new }
        format.json { render json: @user_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_flights/1
  # PATCH/PUT /user_flights/1.json
  def update
    respond_to do |format|
      if @user_flight.update(user_flight_params)
        format.html { redirect_to @user_flight, notice: 'User flight was successfully updated.' }
        format.json { render :show, status: :ok, location: @user_flight }
      else
        format.html { render :edit }
        format.json { render json: @user_flight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_flights/1
  # DELETE /user_flights/1.json
  def destroy
    @user_flight.destroy
    respond_to do |format|
      format.html { redirect_to user_flights_url, notice: 'User flight was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_flight
      @user_flight = UserFlight.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_flight_params
      params.require(:user_flight).permit(:flight_id, :preference_id, :seat_id, :user_id, :booking_number)
    end
end
