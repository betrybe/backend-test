defmodule ApiBlogsWeb.PageController do
  use ApiBlogsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
