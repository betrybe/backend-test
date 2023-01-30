defmodule BlogsApiWeb.UserView do
  use BlogsApiWeb, :view

  alias BlogsApi.User

  def render("create.json", %{user: %User{id: id, display_name: display_name, email: email, image: image}}) do
    %{
      message: "User Created!",
      user: %{
        id: id,
        display_name: display_name,
        email: email,
        image: image
      }
    }
  end
end
