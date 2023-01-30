defmodule BlogsApiWeb.UserController do
  use BlogsApiWeb, :controller

  alias Elixir.BlogsApi

  def create(conn, params) do
    params
    |> BlogsApi.create_user()
    |> handle_response(conn)
  end

  defp handle_response({:ok, user}, conn) do
    conn
    |> put_status(:created)
    |> render("create.json", user: user)
  end
end
