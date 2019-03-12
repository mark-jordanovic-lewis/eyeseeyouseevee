defmodule NoForumTest do
  use ExUnit.Case
  doctest NoForum

  test "greets the world" do
    assert NoForum.hello() == :world
  end
end
