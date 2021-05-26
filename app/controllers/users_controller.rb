class UsersController < ApplicationController
  before_action :authorized, only: [:auto_login]

  # REGISTER
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: { token: token }
    else
      render json: { "message": @user.errors.to_h.values[0] }
    end
  end

  # LOGGING IN
  def login
    @user = User.find_by(displayName: params[:displayName])

    if @user && @user.authenticate(params[:password_digest])
      token = encode_token({user_id: @user.id})
      render json: {user: @user, token: token}
    else
      render json: {error: "Invalid displayName or password_digest"}
    end
  end

  def auto_login
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:displayName, :password_digest, :email, :image)
  end

end
