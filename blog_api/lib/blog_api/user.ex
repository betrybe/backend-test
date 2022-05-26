defmodule BlogApi.User do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  schema "users" do
    field(:display_name, :string)
    field(:email, :string)
    field(:password, :string)
    field(:image, :string)
    timestamps()
  end

  @required_params [:display_name, :email, :password, :image]
  @unique_params [:email]
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params, @unique_params)
    |> validate_required(@required_params)
    |> unique_constraint(@unique_params)
  end
end
