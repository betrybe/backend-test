defmodule ApiBlogsWeb.LoginView do
  use ApiBlogsWeb, :view
  alias ApiBlogsWeb.LoginView

  def render("jwt.json", %{jwt: jwt}) do
    %{jwt: jwt}
  end
end
