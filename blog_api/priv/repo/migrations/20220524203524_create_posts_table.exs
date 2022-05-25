defmodule BlogApi.Repo.Migrations.CreatePostsTable do
  use Ecto.Migration

  def change do
    create table(:posts, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:title, :string)
      add(:content, :string)
      add(:user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false)
      timestamps(inserted_at: :published, updated_at: :updated)
    end
  end
end
