defmodule BloApi.User.CreateTest do
  use BlogApi.DataCase

  alias BlogApi.{Repo, User}
  alias User.Create

  @valid_attrs %{
    display_name: "Name Displayed",
    email: "emailtest@gmail.com",
    password: "123456",
    image: "image"
  }

  @invalid_attrs %{
    display_name: "Name Displayed",
    password: "123456",
    image: "image"
  }

  @email_is_required_message %{email: ["is required"]}

  describe "call/1" do
    test "when all params are valid, creates an user" do
      count_before = Repo.aggregate(User, :count)

      response = Create.call(@valid_attrs)

      count_after = Repo.aggregate(User, :count)

      assert {:ok, @valid_attrs} = response
      assert count_after > count_before
    end

    test "when there are invalid params, returns the error" do
      response = Create.call(@invalid_attrs)

      assert {:error, changeset} = response
      assert errors_on(changeset) == @email_is_required_message
    end
  end
end
