class UsersController < ApplicationController
  before_action :authorized, only: [:auto_login]

  # REGISTER
  def create
    @user = User.create(user_params)
    if @user.valid?
      token = encode_token({user_id: @user.id})
      render json: { token: token }, status: :created
    elsif @user.errors.to_h.values[0].include? 'Usuário'
      render json: { "message": @user.errors.to_h.values[0] }, status: :conflict
    else
      render json: { "message": @user.errors.to_h.values[0] }, status: :bad_request
    end
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])

    if @user && @user.password_digest == params[:password]
      token = encode_token({user_id: @user.id})
      render json: {token: token}
    else
      render json: {error: "Invalid displayName or password"}
    end
  end

  def auto_login
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:displayName, :password_digest, :email, :image)
  end

  def validate_login_params
    { message: '"email" is required' } unless params.include? 'email'
    { message: '"password" is required' } unless params.include? 'password'
    { message: '"email" is not allowed to be empty' } if params['email'] == ''
    { message: '"password" is not allowed to be empty' } if params['password'] == ''
  end

end
