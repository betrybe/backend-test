defmodule BlogApi.PostTest do
  use BlogApi.DataCase

  alias BlogApi.Post

  @valid_attrs %{title: "Title", content: "Content", user_id: Ecto.UUID.generate()}
  @invalid_attrs %{title: "Title", content: "Content"}
  describe "changeset/1" do
    test "when all params are valid, returns a valid changeset" do
      response = Post.changeset(@valid_attrs)

      assert %Ecto.Changeset{
               changes: @valid_attrs,
               errors: [],
               data: %BlogApi.Post{},
               valid?: true
             } = response
    end

    test "when there invalid params returns an invalid changeset" do
      response = Post.changeset(@invalid_attrs)

      assert %Ecto.Changeset{
               changes: @invalid_attrs,
               data: %BlogApi.Post{},
               valid?: false
             } = response

      assert errors_on(response) == %{user_id: ["can't be blank"]}
    end
  end
end
