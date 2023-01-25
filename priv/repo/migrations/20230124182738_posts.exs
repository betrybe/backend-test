defmodule BlogsApi.Repo.Migrations.Posts do
  use Ecto.Migration

  def change do
    create table(:posts, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :content, :string
      add :user_id, references(:users, type: :uuid), null: false
      add :published, :string
      add :updated, :string
      timestamps()
    end
  end
end
