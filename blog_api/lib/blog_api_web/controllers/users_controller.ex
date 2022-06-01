defmodule BlogApiWeb.UsersController do
  use BlogApiWeb, :controller

  alias BlogApiWeb.Auth.Guardian

  action_fallback(BlogApiWeb.FallbackController)

  def create(conn, params) do
    with {:ok, user} <- BlogApi.create_user(params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn
      |> put_status(:ok)
      |> render("create.json", %{token: token})
    end
  end
end
