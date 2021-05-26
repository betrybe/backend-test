class User < ApplicationRecord
  has_secure_password validations: false

  validates :displayName, :password_digest, :image, presence: true
  validates :displayName, uniqueness: { message: "Usuário já existe" }, if: Proc.new{|object| object.errors.empty?}
  validates :email, presence: { message: '"email" is required' }
  validates :password_digest, presence: { message: '"password_digest" is required' }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: '"email" must be a valid email' }, if: Proc.new{|object| object.errors.empty?}
  validates :displayName, length: { minimum: 8, too_short: '"displayName" length must be at least 8 characters long' }
  validates :password_digest, length: { minimum: 6, too_short: '"password_digest" length must be 6 characters long' }, if: Proc.new{|object| object.errors.empty?}

end
