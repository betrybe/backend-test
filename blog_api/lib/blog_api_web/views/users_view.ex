defmodule BlogApiWeb.UsersView do
  use BlogApiWeb, :view

  def render("login.json", %{token: token}) do
    %{token: token}
  end
end
