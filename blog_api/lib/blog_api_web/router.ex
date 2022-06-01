defmodule BlogApiWeb.Router do
  use BlogApiWeb, :router

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/api", BlogApiWeb do
    pipe_through(:api)

    resources("/user", UsersController, only: [:create])
  end
end
