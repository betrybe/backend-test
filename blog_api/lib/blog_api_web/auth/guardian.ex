defmodule BlogApiWeb.Auth.Guardian do
  use Guardian, otp_app: :blog_api

  def subject_for_token(%{id: id}, _claims) do
    sub = to_string(id)
    {:ok, sub}
  end

  def resource_from_claims(%{"sub" => id}) do
    BlogApi.fetch_user(id)
  end
end
