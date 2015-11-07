require 'test_helper'

class UserFlightsControllerTest < ActionController::TestCase
  setup do
    @user_flight = user_flights(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_flights)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_flight" do
    assert_difference('UserFlight.count') do
      post :create, user_flight: { booking_number: @user_flight.booking_number, flight_id: @user_flight.flight_id, preference_id: @user_flight.preference_id, seat_id: @user_flight.seat_id, user_id: @user_flight.user_id }
    end

    assert_redirected_to user_flight_path(assigns(:user_flight))
  end

  test "should show user_flight" do
    get :show, id: @user_flight
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_flight
    assert_response :success
  end

  test "should update user_flight" do
    patch :update, id: @user_flight, user_flight: { booking_number: @user_flight.booking_number, flight_id: @user_flight.flight_id, preference_id: @user_flight.preference_id, seat_id: @user_flight.seat_id, user_id: @user_flight.user_id }
    assert_redirected_to user_flight_path(assigns(:user_flight))
  end

  test "should destroy user_flight" do
    assert_difference('UserFlight.count', -1) do
      delete :destroy, id: @user_flight
    end

    assert_redirected_to user_flights_path
  end
end
