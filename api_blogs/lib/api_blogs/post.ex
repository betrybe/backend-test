defmodule ApiBlogs.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :content, :string
    field :published, :naive_datetime
    field :title, :string
    field :updated, :naive_datetime
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :content, :published, :updated])
    |> validate_required([:title, :content, :published])
    |> foreign_key_constraint(:user_id)
  end
end
