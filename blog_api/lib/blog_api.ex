defmodule BlogApi do
  alias BlogApi.User

  defdelegate create_user(params), to: User.Create, as: :call

  defdelegate fetch_user(id), to: User.Get, as: :call
end
