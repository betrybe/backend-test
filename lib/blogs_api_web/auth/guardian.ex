defmodule BlogsApiWeb.Auth.Guardian do
  @moduledoc """
    Guardian é uma biblioteca de autenticação utilizada tendo como base JWT
  """
  use Guardian, otp_app: :blogs_api

  def subject_for_token(user, _claims) do
    sub = to_string(user.id)
    {:ok, sub}
  end

  def resource_from_claims(claims) do
    claims
    |> Map.get("sub")
    |> BlogsApi.fetch_user()
  end
end
