defmodule ApiBlogs.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ApiBlogs.Repo,
      # Start the Telemetry supervisor
      ApiBlogsWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ApiBlogs.PubSub},
      # Start the Endpoint (http/https)
      ApiBlogsWeb.Endpoint
      # Start a worker by calling: ApiBlogs.Worker.start_link(arg)
      # {ApiBlogs.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ApiBlogs.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ApiBlogsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
