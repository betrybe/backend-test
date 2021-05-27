class CreateJwtTokens < ActiveRecord::Migration[6.1]
  def change
    create_table :jwt_tokens do |t|
      t.string :expired_token

      t.timestamps
    end
  end
end
