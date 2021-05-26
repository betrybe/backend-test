class User < ApplicationRecord
  has_secure_password

  validates :displayName, :email, :password_digest, :image, presence: true
  validates :password_digest, length: { minimum: 6, too_short: '"password_digest" length must be 6 characters long' }
end
