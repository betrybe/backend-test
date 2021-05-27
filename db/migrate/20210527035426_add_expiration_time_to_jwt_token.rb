class AddExpirationTimeToJwtToken < ActiveRecord::Migration[6.1]
  def change
    add_column :jwt_tokens, :expiration_time, :integer
  end
end
