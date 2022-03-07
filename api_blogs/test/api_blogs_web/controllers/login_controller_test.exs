defmodule ApiBlogsWeb.LoginControllerTest do
  use ApiBlogsWeb.ConnCase

  import ApiBlogs.BlogFixtures

  alias ApiBlogs.Blog.User

  @create_attrs %{
    displayName: "rubens silva",
    email: "rubens@email.com",
    image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    password: "123456"
  }

  setup %{conn: conn} do
    {:ok, conn: post(conn, Routes.user_path(conn, :create), user: @create_attrs)}
  end

  describe "post login" do
    test "returns jwt when data is valid", %{conn: conn} do
      valid_attrs = %{
        email: "rubens@email.com",
        password: "123456"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: valid_attrs)
      assert nil != json_response(conn, 200)["jwt"]
    end

    test "renders errors when no email is provided", %{conn: conn} do
      invalid_attrs = %{
        password: "123456"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when no password is provided", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when email is blank", %{conn: conn} do
      invalid_attrs = %{
        email: "",
        password: "123456"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when password is blank", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com",
        password: ""
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when password is wrong", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com",
        password: "1234567"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "Campos invalidos"}
    end

    test "renders errors when user doesn't exist", %{conn: conn} do
      invalid_attrs = %{
        email: "maria@email.com",
        password: "1234567"
      }
      conn = post(conn, Routes.login_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "Campos invalidos"}
    end
  end
end
