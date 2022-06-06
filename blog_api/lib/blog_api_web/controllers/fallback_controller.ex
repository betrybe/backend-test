defmodule BlogApiWeb.FallbackController do
  use BlogApiWeb, :controller
  alias BlogApiWeb.ErrorView

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(ErrorView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, message}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ErrorView)
    |> render("bad_request.json", message: message)
  end
end
