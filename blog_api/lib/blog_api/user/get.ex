defmodule BlogApi.User.Get do
  alias BlogApi.{User, Repo}
  alias Ecto.UUID

  @moduledoc """
  Busca Users no banco de dados
  """

  @spec call(integer()) :: User.t()
  def call(id) do
    case UUID.cast(id) do
      :error -> {:error, "Invalid ID formart!"}
      {:ok, uuid} -> get(uuid)
    end
  end

  defp get(uuid) do
    case Repo.get(User, uuid) do
      nil -> {:error, "User not found!"}
      user -> {:ok, user}
    end
  end
end
