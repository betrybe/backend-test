defmodule ApiBlogs.Repo do
  use Ecto.Repo,
    otp_app: :api_blogs,
    adapter: Ecto.Adapters.Postgres
end
