require 'pg'
require_relative './db_errors'

class DBGenerator
  include DBErrors

  def initialize(conn, parser)
    @parser = parser
    @connection = conn
    validate_deps
  end

  def create_tables_from_file
    connection.async_exec(@parser.create_table_query)
  end

  private

  attr_reader :connection, :parser

  def validate_deps
    message = []
    message << "PG::Connection" unless connection.is_a? PG::Connection
    message << "DBFileParser" unless parser.is_a? DBFileParse
    raise ArgumentError.new("Must inject #{message.join(" and ")} to DBGenerator.") unless message.empty?
  end
end
