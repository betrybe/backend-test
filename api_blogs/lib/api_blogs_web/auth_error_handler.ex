
defmodule ApiBlogs.AuthErrorHandler do
  import Plug.Conn
  use ApiBlogsWeb, :controller

  def auth_error(conn, {type, _reason}, _opts) do
    body = Jason.encode!(%{error: to_string(type)})
    message =
    case body do
      "{\"error\":\"unauthenticated\"}" -> "Token nao encontrado"
      "{\"error\":\"invalid_token\"}" -> "Token expirado ou invalido"
    end

    conn
    |> put_status(:unauthorized)
    |> put_view(ApiBlogsWeb.ErrorView)
    |> json(%{message: message})
  end

end
