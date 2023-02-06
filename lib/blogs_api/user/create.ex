defmodule BlogsApi.User.Create do
  @moduledoc """
  Criação do Módulo bem encapsulado e específico para a ação do Create
  """
  alias Elixir.BlogsApi.{Repo, User}

  def call(params) do
    params
    |> User.changeset()
    |> email_exists?()
    |> Repo.insert()
  end

  defp email_exists?({:ok, user}), do: {:ok, user}

  defp email_exists?({:error, changeset}) do
    if Enum.any?(changeset.errors, fn error ->
         match?({:email, {_, [constraint: :unique, constraint_name: _]}}, error)
       end) do
      {:error, :email_exists}
    else
      {:error, changeset}
    end
  end

  defp email_exists?(result), do: result

  # defp create_user(struct) do
  # {:error, _changeset} = Repo.insert(struct)
  # end

  # defp create_user({:error, _changeset} = error), do: error
end
