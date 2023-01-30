defmodule BlogsApiWeb.ErrorView do
  use BlogsApiWeb, :view

  import Ecto.Changeset, only: [traverse_errors: 2]
  # If you want to customize a particular status code
  # for a certain format, you may uncomment below.
  # def render("500.json", _assigns) do
  #   %{errors: %{detail: "Internal Server Error"}}
  # end

  # By default, Phoenix returns the status message from
  # the template name. For example, "404.json" becomes
  # "Not Found".
  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end

  def render("400.json", %{result: result}) do
    %{message: translate_errors(result)}
  end

  defp translate_errors(changeset) do
    #traverse_errors(changeset, fn {mgs, opts} ->
      #Enum.reduce(opts, mgs, fn {key, value}, acc ->
       # String.replace(acc, "%{#{key}}", to_string(value))
      #end)

      traverse_errors(changeset, fn {msg, opts} ->
        Regex.replace(~r"%{(\w+)}", msg, fn _, key ->
          opts |> Keyword.get(String.to_existing_atom(key), key) |> to_string()
        end)
      end)
     # %{display_name: ["\"display_name\" length must be at least 8 characters long"]}

  end
end
