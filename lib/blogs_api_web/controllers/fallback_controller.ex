defmodule BlogsApiWeb.FallbackController do

  use BlogsApiWeb, :controller

  def call(conn, {:error, :email_exists}) do
    conn
    |> put_status(:conflict)
    |> put_view(BlogsApiWeb.ErrorView)
    |> render("409.json", message: "Usuário já existe")
  end

  def call(conn, {:error, result}) do
    conn
    |> put_status(:bad_request)
    |> put_view(BlogsApiWeb.ErrorView)
    |> render("400.json", result: result)
  end
end
