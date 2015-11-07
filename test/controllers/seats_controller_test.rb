require 'test_helper'

class SeatsControllerTest < ActionController::TestCase
  setup do
    @seat = seats(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:seats)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create seat" do
    assert_difference('Seat.count') do
      post :create, seat: { color: @seat.color, flight_id: @seat.flight_id, free: @seat.free, label: @seat.label, row_number: @seat.row_number, seat_letter: @seat.seat_letter }
    end

    assert_redirected_to seat_path(assigns(:seat))
  end

  test "should show seat" do
    get :show, id: @seat
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @seat
    assert_response :success
  end

  test "should update seat" do
    patch :update, id: @seat, seat: { color: @seat.color, flight_id: @seat.flight_id, free: @seat.free, label: @seat.label, row_number: @seat.row_number, seat_letter: @seat.seat_letter }
    assert_redirected_to seat_path(assigns(:seat))
  end

  test "should destroy seat" do
    assert_difference('Seat.count', -1) do
      delete :destroy, id: @seat
    end

    assert_redirected_to seats_path
  end
end
