defmodule BlogApiWeb.UsersView do
  use BlogApiWeb, :view

  def render("create.json", %{token: token}) do
    %{
      token: token
    }
  end
end
