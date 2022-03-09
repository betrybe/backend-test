defmodule ApiBlogs.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline, otp_app: :api_blogs,
  module: ApiBlogs.Guardian,
  error_handler: ApiBlogs.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
