defmodule BlogApi.Repo.Migrations.RenamePasswordField do
  use Ecto.Migration

  def change do
    rename(table("users"), :password, to: :password_hash)
  end
end
