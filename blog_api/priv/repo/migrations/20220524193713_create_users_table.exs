defmodule BlogApi.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:display_name, :string)
      add(:email, :string)
      add(:password, :string)
      add(:image, :string)
      timestamps()
    end
  end
end
