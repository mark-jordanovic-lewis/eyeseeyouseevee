require 'pg'
require_relative './db_errors'

class DBSeeder
  include DBErrors

  class << self
    def execute(conn, query)
      validate_deps(conn)
      ids = safely { connection.async_exec(%Q!BEGIN;#{query}COMMIT;!) }['id']
      add_down_query_ids(ids)
      puts "DB Seeded - queries down migration has been built."
    end

    private

    attr_reader :connection, :query

    def add_down_query_ids!(ids)
      query.down = query.down
        .split("\n")
        .zip(ids)
        .map { |(line, id)| line.gsub('<MISSING>', id) }
    end

    def validate_deps(conn)
      raise ArgumentError.new("Must inject PG::Connection object") unless conn.is_a? PG::Connection
    end
  end
end
