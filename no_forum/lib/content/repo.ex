defmodule Content.Repo do
  use Ecto.Repo,
    otp_app: :no_forum,
    adapter: Ecto.Adapters.Postgres
end

defmodule Content.Page do
  use Ecto.Schema

  schema "page" do
    field :content, :string
    field :urls, {:array, :string}
    field :slug, :string
  end
end
