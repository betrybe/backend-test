defmodule BlogsApi.User do
  @moduledoc """
  Criação do Squema do User, com as devidas validações
  """
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  schema "users" do
    field :display_name, :string
    field :email, :string
    field :password, :string
    field :image, :string
  end

  @required_params [:display_name, :email, :password, :image]
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
  end

  def build(params) do
    params
    |> changeset()
    |> apply_action(:insert)
  end
end
