class UsersController < ApplicationController
  before_action :authorized, only: [:auto_login, :index]

  def index
    @users = User.all
    render json: @users, status: :ok
  end

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
      render json: {token: token}, status: :ok
    else
      render json: validate_login_params, status: :bad_request
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
    if (params.include? 'email') == false
      { message: '"email" is required' }
    elsif (params.include? 'password') == false
      { message: '"password" is required' }
    elsif (params['email'] == '') == true
      { message: '"email" is not allowed to be empty' }
    elsif (params['password'] == '') == true
      { message: '"password" is not allowed to be empty' }
    elsif User.find_by(email: params[:email]).present? == false
      { message: 'Campos inválidos' }
    end
  end

end
