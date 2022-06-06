defmodule BlogApiWeb.ErrorView do
  use BlogApiWeb, :view

  import Ecto.Changeset, only: [traverse_errors: 2]

  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end

  def render("error.json", %{changeset: changeset}) do
    %{message: translate_errors(changeset)}
  end

  def render("bad_request.json", %{message: message}) do
    %{message: message}
  end

  defp translate_errors(changeset) do
    traverse_errors(changeset, &translate_error/1)
  end
end
