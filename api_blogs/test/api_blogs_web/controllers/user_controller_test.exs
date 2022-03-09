defmodule ApiBlogsWeb.UserControllerTest do
  use ApiBlogsWeb.ConnCase

  import ApiBlogs.BlogFixtures

  alias ApiBlogs.Blog.User

  @create_attrs %{
    displayName: "rubens silva",
    email: "rubens@email.com",
    image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
    password: "123456"
  }
  # @update_attrs %{
  #   displayName: "some updated displayName",
  #   email: "some updated email",
  #   image: "some updated image",
  #   password: "some updated password"
  # }
  # @invalid_attrs %{displayName: nil, email: nil, image: nil, password: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all users", %{conn: conn} do
      new_user = %{
        displayName: "maria silva",
        email: "maria@email.com",
        password: "654321"
      }

      conn = conn
      |> post(Routes.user_path(conn, :create), user: @create_attrs)
      |> post(Routes.user_path(conn, :create), user: new_user)

      split_response_body = String.split(conn.resp_body, "\"")
      [_ | [_ | [_ | [jwt | _]]]] = split_response_body

      conn = build_conn()
      conn = conn
      |> put_req_header("authorization", "bearer " <> jwt)
      |> get(Routes.user_path(conn, :index))

      response_data = json_response(conn, 200)["data"]
      assert hd(response_data)["email"] == "rubens@email.com"
      assert hd(tl(response_data))["email"] == "maria@email.com"
    end

    test "lists all users invalid jwt", %{conn: conn} do
      conn =
      conn
      |> put_req_header("authorization", "bearer abcd")
      |> get(Routes.user_path(conn, :index))

      assert json_response(conn, 401) == %{"message" => "Token expirado ou invalido"}
    end

    test "lists all users missing jwt", %{conn: conn} do
      conn = get(conn, Routes.user_path(conn, :index))
      assert json_response(conn, 401) == %{"message" => "Token nao encontrado"}
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)
      assert nil != json_response(conn, 201)["jwt"]

      # conn = get(conn, Routes.user_path(conn, :show, id))

      # assert %{
      #          "id" => ^id,
      #          "displayName" => "rubens silva",
      #          "email" => "rubens@email.com",
      #          "image" => "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
      #          "password" => "123456"
      #        } = json_response(conn, 200)["data"]
    end

    test "renders errors when displayName has less than 8 characters", %{conn: conn} do
      invalid_user = %{
        displayName: "rubinho",
        email: "rubens@email.com",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"displayName" => ["should be at least 8 character(s)"]}
    end

    test "renders errors when email has no domain", %{conn: conn} do
      invalid_user = %{
        displayName: "rubens silva",
        email: "rubinho",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"email" => ["has invalid format"]}
    end

    test "renders errors when email has no prefix", %{conn: conn} do
      invalid_user = %{
        displayName: "rubens silva",
        email: "@gmail.com",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"email" => ["has invalid format"]}
    end

    test "renders errors when no email is provided", %{conn: conn} do
      invalid_user = %{
        displayName: "rubens silva",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"email" => ["can't be blank"]}
    end

    test "renders errors when password is less than 6 characters long", %{conn: conn} do
      invalid_user = %{
        displayName: "rubens silva",
        email: "rubens@email.com",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png",
        password: "12345"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"password" => ["should be at least 6 character(s)"]}
    end

    test "renders errors when no password is provided", %{conn: conn} do
      invalid_user = %{
        displayName: "rubens silva",
        email: "rubens@email.com",
        image: "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
      }
      conn = post(conn, Routes.user_path(conn, :create), user: invalid_user)
      assert json_response(conn, 400)["errors"] == %{"password" => ["can't be blank"]}
    end

    test "renders errors when email already exists", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)
      assert nil != json_response(conn, 201)["jwt"]

      conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)
      assert json_response(conn, 409)["errors"] == %{"email" => ["Usuario ja existe"]}
    end

    # test "renders errors when data is invalid", %{conn: conn} do
    #   conn = post(conn, Routes.user_path(conn, :create), user: @invalid_attrs)
    #   assert json_response(conn, 422)["errors"] != %{}
    # end
  end

  # describe "update user" do
  #   setup [:create_user]

  #   test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
  #     conn = put(conn, Routes.user_path(conn, :update, user), user: @update_attrs)
  #     assert %{"id" => ^id} = json_response(conn, 200)["data"]

  #     conn = get(conn, Routes.user_path(conn, :show, id))

  #     assert %{
  #              "id" => ^id,
  #              "displayName" => "some updated displayName",
  #              "email" => "some updated email",
  #              "image" => "some updated image",
  #              "password" => "some updated password"
  #            } = json_response(conn, 200)["data"]
  #   end

  #   test "renders errors when data is invalid", %{conn: conn, user: user} do
  #     conn = put(conn, Routes.user_path(conn, :update, user), user: @invalid_attrs)
  #     assert json_response(conn, 422)["errors"] != %{}
  #   end
  # end

  # describe "delete user" do
  #   setup [:create_user]

  #   test "deletes chosen user", %{conn: conn, user: user} do
  #     conn = delete(conn, Routes.user_path(conn, :delete, user))
  #     assert response(conn, 204)

  #     assert_error_sent 404, fn ->
  #       get(conn, Routes.user_path(conn, :show, user))
  #     end
  #   end
  # end

  describe "user login" do
    setup [:add_user]

    test "returns jwt when data is valid", %{conn: conn} do
      valid_attrs = %{
        email: "rubens@email.com",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: valid_attrs)
      assert nil != json_response(conn, 200)["jwt"]
    end

    test "renders errors when no email is provided", %{conn: conn} do
      invalid_attrs = %{
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when no password is provided", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when email is blank", %{conn: conn} do
      invalid_attrs = %{
        email: "",
        password: "123456"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when password is blank", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com",
        password: ""
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "email and password are required"}
    end

    test "renders errors when password is wrong", %{conn: conn} do
      invalid_attrs = %{
        email: "rubens@email.com",
        password: "1234567"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "Campos invalidos"}
    end

    test "renders errors when user doesn't exist", %{conn: conn} do
      invalid_attrs = %{
        email: "maria@email.com",
        password: "1234567"
      }
      conn = post(conn, Routes.user_path(conn, :login), user: invalid_attrs)
      assert json_response(conn, 400) == %{"message" => "Campos invalidos"}
    end
  end

  # defp create_user(_) do
  #   user = user_fixture()
  #   %{user: user}
  # end

  defp add_user %{conn: conn} do
    {:ok, conn: post(conn, Routes.user_path(conn, :create), user: @create_attrs)}
  end
end
