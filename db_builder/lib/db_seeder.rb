require 'pg'
require_relative './db_errors'

class DBSeeder
  class << self
    include DBErrors

    def execute(conn, query)
      validate_deps(conn)
      ids = safely { conn.async_exec(%Q!BEGIN;\n#{query.up}\nCOMMIT;!) }
      add_down_query_ids!(conn, query)
      puts "DB Seeded - queries down migration has been built."
    end

    private

    # only know the ids after the execution
    def add_down_query_ids!(conn, query)
      query.instance_variable_set(:@down,
        query.down
          .split("\n")
          .zip(conn.async_exec('select ins_id from insert_ids;').values.flatten)
          .map { |(line, id)| line.gsub('<MISSING>', id) }
          .uniq
          .join("\n"))
    end

    def validate_deps(conn)
      raise ArgumentError.new("Must inject PG::Connection object") unless conn.is_a? PG::Connection
    end
  end
end
