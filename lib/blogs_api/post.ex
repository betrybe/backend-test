defmodule BlogsApi.Post do
  use Ecto.Schema
  import Ecto.Changeset

  alias BlogsApi.User

  @primary_key {:id, Ecto.UUID, autogenerate: true}
  @foreign_key_type Ecto.UUID

  schema "posts" do
    field :title, :string
    field :content, :string
    belongs_to(:user, User)
    timestamps()
  end

  @required_params ~w(title content user_id)a
  #@spec changeset(:invalid | %{optional(:__struct__) => none, optional(atom | binary) => any}) ::
          #Ecto.Changeset.t()
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
  end
end
