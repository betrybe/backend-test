defmodule ApiBlogs.BlogFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `ApiBlogs.Blog` context.
  """

  @doc """
  Generate a unique user email.
  """
  def unique_user_email, do: "some email#{System.unique_integer([:positive])}"

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        displayName: "some displayName",
        email: unique_user_email(),
        image: "some image",
        password: "some password"
      })
      |> ApiBlogs.Blog.create_user()

    user
  end

  @doc """
  Generate a post.
  """
  def post_fixture(attrs \\ %{}) do
    {:ok, post} =
      attrs
      |> Enum.into(%{
        content: "some content",
        published: ~N[2022-02-21 18:51:00],
        title: "some title",
        updated: ~N[2022-02-21 18:51:00]
      })
      |> ApiBlogs.Blog.create_post()

    post
  end
end
