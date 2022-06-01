defmodule BlogApi.UserTest do
  use BlogApi.DataCase

  alias BlogApi.User

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

  describe "changeset/1" do
    test "when all params are valid, returns a valid changeset" do
      response = User.changeset(@valid_attrs)

      assert %Ecto.Changeset{
               action: nil,
               changes: @valid_attrs,
               errors: [],
               data: %BlogApi.User{},
               valid?: true
             } = response
    end

    test "when there are invalid params, returns an invalid changeset" do
      response = User.changeset(@invalid_attrs)

      assert %Ecto.Changeset{
               action: nil,
               changes: @invalid_attrs,
               data: %BlogApi.User{},
               valid?: false
             } = response

      assert errors_on(response) == @email_is_required_message
    end
  end
end
