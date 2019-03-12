defmodule NoForum do
  @moduledoc """
  Documentation for NoForum.
  """


  @doc """
  server code chunk
  ## Examples

  """
  use Ace.HTTP.Service, port: 8080, cleartext: true
  use Raxx.SimpleServer
  
  @impl Raxx.SimpleServer
  def handle_request(%{method: :GET, path: []}, %{greeting: greeting}) do
    response(:ok)
    |> set_header("content-type", "text/plain")
    |> set_body("#{greeting}, World!")
  end

  @impl Raxx.SimpleServer
  def handle_request(%{method: :GET, path: ["content", slug]}, %{greeting: greeting}) do
    response(:ok)
    #|> set_header("content-type", "text/plain")
    |> set_body("#{greeting}, Mark")
    # use slug to get content from DB
  end


  @doc """
  postgres code chunk
  """
  import Ecto.Query
  alias Content.{Page, Repo}

  def keyword_query(slug) do
    query =
      from page in Page,
           where: page.slug == slug,
           select: page,
           limit: 1

    Repo.all(query)
  end

  def pipe_query(slug) do
    Page
    |> where(slug: slug)
    |> limit(1)
    |> Repo.all
  end

end
# config = %{greeting: "Hello"}
# options = [port: 8443, certfile: "path/to/certificate", keyfile: "path/to/key"]
# NoForum.start_link(config, options)
