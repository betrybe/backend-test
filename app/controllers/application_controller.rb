class ApplicationController < ActionController::API
  before_action :authorized

  # move it to credentials
  SECRET = '8727ceb32b97af057db5e91aa24752f1e2e819b2'

  def encode_token(payload)
    exp = Time.now.to_i + 4 * 3600
    exp_payload = { data: payload, exp: exp }

    jwt = JWT.encode(exp_payload, SECRET)
    JwtToken.create!(expired_token: jwt, expiration_time: exp)
    jwt
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      # header: { 'Authorization': 'Bearer <token>' }
      begin
        JWT.decode(token, SECRET, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['data']['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    token = auth_header.split(' ')[1]
    if JwtToken.where(expired_token: token).exists? && JwtToken.find_by(expired_token: token).expiration_time < Time.now.to_i && !logged_in?
      render json: {'message': 'Token expirado ou inválido'}
    elsif !logged_in?
      render json: { 'message': 'Token não encontrado' }, status: :unauthorized
    end
  end
end
