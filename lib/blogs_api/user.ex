defmodule BlogsApi.User do
  @moduledoc """
  Criação do schema do User, com as devidas validações
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

  @required_params ~w(display_name email password)a
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> validate_required(:email, message: "\"email\" is required")
    |> validate_required(:password, message: "\"password\" is required")
    |> validate_length(:display_name, min: 8, message: "\"display_name\" length must be at least 8 characters long")
    |> validate_length(:password, min: 6, message: "\"password\" length must be 6 characters long")
    |> validate_format(:email, ~r/@/, [{:message, "\"email\" must be a valid email"}])
    |> unique_constraint(:email, message: "Usuário já existe")
  end

  def build(params) do
    params
    |> changeset()
    |> apply_action(:insert)
  end
end
