defmodule ApiBlogsWeb.LoginController do
  use ApiBlogsWeb, :controller

  alias ApiBlogs.Blog
  alias ApiBlogs.Guardian

  action_fallback ApiBlogsWeb.FallbackController

  def login(conn, %{"user" => user_params}) do
    with {:ok, %{} = user} <- Blog.do_login(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn
      |> render("jwt.json", jwt: token)
    end
  end
end
