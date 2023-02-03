defmodule BlogsApiWeb.FallbackController do

  use BlogsApiWeb, :controller

  def call(conn, {:error, :email_taken}) do
    conn
    |> put_status(:conflict)
    |> put_view(BlogsApiWeb.ErrorView)
    |> render("409.json", message: "User already exists")
  end

  def call(conn, {:error, result}) do
    conn
    |> put_status(:bad_request)
    |> put_view(BlogsApiWeb.ErrorView)
    |> render("400.json", result: result)
  end
end
