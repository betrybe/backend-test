class UserSerializer < ActiveModel::Serializer
  attributes :id, :displayName, :email, :image
end
