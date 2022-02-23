defmodule ApiBlogsWeb.PostView do
  use ApiBlogsWeb, :view
  alias ApiBlogsWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      updated: post.updated
    }
  end
end
