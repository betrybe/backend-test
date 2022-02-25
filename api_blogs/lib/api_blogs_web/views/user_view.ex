defmodule ApiBlogsWeb.UserView do
  use ApiBlogsWeb, :view
  alias ApiBlogsWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      image: user.image
    }
  end

  def render("jwt.json", %{jwt: jwt}) do
    %{jwt: jwt}
  end
end
