defmodule BlogsApi.Repo.Migrations.Posts do
  use Ecto.Migration

  def change do
    create table(:posts, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string, null: false
      add :content, :string, null: false
      add :user_id, references(:users, type: :uuid), null: false
      timestamps()
    end

    create index(:posts, [:user_id])
  end
end
