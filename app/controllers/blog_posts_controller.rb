class BlogPostsController < ApplicationController
  before_action :authorized, only: [:index, :show, :destroy, :update, :search]
  before_action :set_post, only: [:update, :destroy]

  def index
    @posts = BlogPost.all
    render json: @posts, status: :ok
  end

  def show
    if request.path == "/post/search"
      searchTerm = request.url.split(/post/i, 2)[1].split(/=/i, 2)[1]
      if searchTerm == ''
        render json: BlogPost.all, status: :ok
      else
        posts_attributes = ['title', 'content']
        queries = posts_attributes.map { |attr| "#{attr} LIKE '%#{searchTerm}%'" }
        built_query = queries.join(" OR ")
        posts = BlogPost.where(built_query)
        render json: posts.all, status: :ok
      end
    else
      set_post
      render json: @post, status: :ok
    end
  end

  def update
    if (params.to_s.include? 'title') == false
      render json: { message: '"title" is required' }, status: :unauthorized
    elsif (params.to_s.include? 'content') == false
      render json: { message: '"content" is required' }, status: :unauthorized
    elsif token_user_id == @post.user_id
      params.permit!
      update_params = params.to_h
      
      json = JSON.parse update_params.first[0]
      json['userId'] = @post.user_id
      
      render json: json, status: :ok if @post.update!(JSON.parse update_params.first[0])
    else
      render json: {"message": "Usuário não autorizado"}, status: :unauthorized
    end
    
  end

  def destroy
    if token_user_id == @post.user_id
      @post.destroy!
      render nothing: true, status: :no_content
    else
      render json: {"message": "Usuário não autorizado"}
    end
  end

  private

  def set_post
    begin
      @post = BlogPost.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: {"message": "Post não existe"}, status: :not_found
    end
  end

  def post_params
    params.require(:blog_post).permit(:title, :content)
  end

  def token_user_id
    decoded_token[0]['data']['user_id']
  end

end
