defmodule BlogsApi.Repo do
  use Ecto.Repo,
    otp_app: :blogs_api,
    adapter: Ecto.Adapters.Postgres
end
