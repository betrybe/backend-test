defmodule ApiBlogs.BlogTest do
  use ApiBlogs.DataCase

  alias ApiBlogs.Blog

  describe "users" do
    alias ApiBlogs.Blog.User

    import ApiBlogs.BlogFixtures

    @invalid_attrs %{displayName: nil, email: nil, image: nil, password: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Blog.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Blog.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{displayName: "some displayName", email: "some email", image: "some image", password: "some password"}

      assert {:ok, %User{} = user} = Blog.create_user(valid_attrs)
      assert user.displayName == "some displayName"
      assert user.email == "some email"
      assert user.image == "some image"
      assert user.password == "some password"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{displayName: "some updated displayName", email: "some updated email", image: "some updated image", password: "some updated password"}

      assert {:ok, %User{} = user} = Blog.update_user(user, update_attrs)
      assert user.displayName == "some updated displayName"
      assert user.email == "some updated email"
      assert user.image == "some updated image"
      assert user.password == "some updated password"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_user(user, @invalid_attrs)
      assert user == Blog.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Blog.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Blog.change_user(user)
    end
  end

  describe "posts" do
    alias ApiBlogs.Blog.Post

    import ApiBlogs.BlogFixtures

    @invalid_attrs %{content: nil, published: nil, title: nil, updated: nil}

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Blog.list_posts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Blog.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      valid_attrs = %{content: "some content", published: ~N[2022-02-21 18:51:00], title: "some title", updated: ~N[2022-02-21 18:51:00]}

      assert {:ok, %Post{} = post} = Blog.create_post(valid_attrs)
      assert post.content == "some content"
      assert post.published == ~N[2022-02-21 18:51:00]
      assert post.title == "some title"
      assert post.updated == ~N[2022-02-21 18:51:00]
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      update_attrs = %{content: "some updated content", published: ~N[2022-02-22 18:51:00], title: "some updated title", updated: ~N[2022-02-22 18:51:00]}

      assert {:ok, %Post{} = post} = Blog.update_post(post, update_attrs)
      assert post.content == "some updated content"
      assert post.published == ~N[2022-02-22 18:51:00]
      assert post.title == "some updated title"
      assert post.updated == ~N[2022-02-22 18:51:00]
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_post(post, @invalid_attrs)
      assert post == Blog.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Blog.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Blog.change_post(post)
    end
  end
end
