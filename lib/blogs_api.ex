defmodule BlogsApi do
  alias BlogsApi.User

  defdelegate create_user(params), to: User.Create, as: :call
end
