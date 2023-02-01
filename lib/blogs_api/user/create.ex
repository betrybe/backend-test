
defmodule BlogsApi.User.Create do
@moduledoc """
Criação do Módulo bem encapsulado e específico para a ação do Create
"""
  alias Elixir.BlogsApi.{Repo, User}

  def call(params) do
    params
    |> User.build()
    |> create_user()
  end

  defp create_user({:ok, struct}), do: Repo.insert(struct)
  defp create_user({:error, _changeset} = error), do: error

end
