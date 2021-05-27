class BlogPostSerializer < ActiveModel::Serializer
  attributes :id, :published, :updated, :title, :content, :user

  belongs_to :user

  def published
    object.created_at
  end

  def updated
    object.updated_at
  end
end
