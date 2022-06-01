defmodule BlogApiWeb.FallbackController do
  use BlogApiWeb, :controller
  alias BlogApiWeb.ErrorView

  def call(conn, {:error, %{} = changeset}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ErrorView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, message}) do
    conn
    |> put_status(:conflict)
    |> put_view(ErrorView)
    |> render("conflict.json", conflict: message)
  end
end
