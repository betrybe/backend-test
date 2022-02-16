defmodule ApiBlogs.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :displayName, :string
    field :email, :string
    field :image, :string
    field :password, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:displayName, :email, :password, :image])
    |> validate_required([:displayName, :email, :password, :image])
    |> unique_constraint(:email)
  end
end
