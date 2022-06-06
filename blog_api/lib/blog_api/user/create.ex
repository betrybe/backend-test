defmodule BlogApi.User.Create do
  alias BlogApi.{Repo, User}

  @moduledoc """
  Cria e insere users no banco de dados.
  """

  @spec call(map()) ::
          {:ok, Ecto.Schema.t()} | {:error, Ecto.Changeset.t()} | {:error, String.t()}
  def call(params) do
    params
    |> User.build()
    |> create_user()
  end

  defp create_user({:ok, struct}) do
    case Repo.get_by(User, email: struct.email) do
      nil -> Repo.insert(struct)
      _ -> {:error, "User already exists"}
    end
  end

  defp create_user({:error, _changeset} = error), do: error
end
