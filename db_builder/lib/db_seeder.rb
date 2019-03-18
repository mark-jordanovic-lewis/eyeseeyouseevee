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
          .zip(conn.async_exec('select ins_id, ins_table from insert_ids;').values)
          .map { |(line, row)| line.gsub('<MISSING>', row[0]).gsub('<INSTABLE>', row[1]) }
          .uniq
          .join("\n"))
      conn.async_exec("drop table if exists insert_ids;")
    end

    def validate_deps(conn)
      raise ArgumentError.new("Must inject PG::Connection object") unless conn.is_a? PG::Connection
    end
  end
end
