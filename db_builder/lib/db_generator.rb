require 'pg'
require_relative './db_errors'

class DBGenerator
  include DBErrors

  def initialize(conn, create_query)
    @create_query = create_query
    @connection = conn
    validate_deps
  end

  def create_tables
    safely { connection.async_exec(create_query) }
  end

  private

  attr_reader :connection, :create_query

  def validate_deps # dep injection not nice in ruby - too much code for such low gain.
    raise ArgumentError.new("Must inject PG::Connection into DBGenerator.") unless connection.is_a? PG::Connection
  end
end
