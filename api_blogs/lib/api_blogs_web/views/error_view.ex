defmodule ApiBlogsWeb.ErrorView do
  use ApiBlogsWeb, :view

  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.html", _assigns) do
  #   "Internal Server Error"
  # end
  def render("missing_info.json", %{conn: conn}) do
    %{message: "email and password are required"}
  end

  def render("invalid_entry.json", %{conn: conn}) do
    %{message: "Campos invalidos"}
  end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.html" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    Phoenix.Controller.status_message_from_template(template)
  end
end
