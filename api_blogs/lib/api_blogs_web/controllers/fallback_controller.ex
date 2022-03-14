defmodule ApiBlogsWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use ApiBlogsWeb, :controller

  defp email_taken?({:email, {_, [constraint: :unique, constraint_name: _]}}), do: true
  defp email_taken?(_), do: false

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    # Caso de tentativa de cadastro de email repetido
    status_code =
    if Enum.any?(changeset.errors, &email_taken?/1) do
      :conflict
    else
      :bad_request
    end

    conn
    |> put_status(status_code)
    |> put_view(ApiBlogsWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(ApiBlogsWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, :login_invalid_entry}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ApiBlogsWeb.ErrorView)
    |> json(%{message: "Campos invalidos"})
  end

  def call(conn, {:error, :login_missing_info}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ApiBlogsWeb.ErrorView)
    |> json(%{message: "email and password are required"})
  end

  def call(conn, {:error, :nonexistent_user}) do
    conn
    |> put_status(:not_found)
    |> put_view(ApiBlogsWeb.ErrorView)
    |> json(%{message: "Usuario nao existe"})
  end
end
