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

  @doc """
   Verifica se os parametros de criação do usuário atendem aos requisitos do changeset
  """
  @spec build(map()) :: Ecto.Schema.t() | Ecto.Changeset.t()
  def build(params) do
    params
    |> changeset()
    |> apply_action(:insert)
  end

  @required_params [:display_name, :email, :password, :image]
  @unique_params [:email]
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params, @unique_params)
    |> validate_required(@required_params, message: "is required")
    |> validate_length(:password,
      min: 6,
      message: "\"password\"length must be at least 6 characters long"
    )
    |> validate_length(:display_name,
      min: 8,
      message: "\"display_name\"length must be at least 8 characters long"
    )
    |> validate_format(:email, ~r/^[A-Za-z0-9_.-]+@[A-Za-z0-9]+\.[A-Za-z0-9]+(\.[A-Za-z0-9])?/,
      message: "\"email\" must be a valid email"
    )
    |> unique_constraint(@unique_params)
  end
end
