class Api::UsersController < ApplicationController

  def index
    @users = User.all.limit(3)
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(username: params[:id])
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_image_url)
  end

end
