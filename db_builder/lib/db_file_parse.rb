require 'yaml'
require 'pry'

class DBFileParse
  attr_reader :drop_table_query

  class Query
    attr_reader :up, :down
    def initialize(up, down)
      @up = up
      @down = down
    end
  end

  class << self
    def create_table_query(filename)
      build_query filename, 'tables' do |table, queries|
        queries[0] << "CREATE TABLE IF NOT EXISTS #{table['name']} (#{columns_for(table)});"
        queries[1] << "DROP TABLE IF EXISTS #{table['name']};"
      end
    end

    def create_seed_inserts(filename)
      build_query filename, 'seeds' do |seed, queries|
        queries[0] << "INSERT INTO #{seed['table']} (#{seed['columns'].join(', ')}) VALUES (#{seed['data'].map{ |line| line.join(',') }.join('),(')}) RETURNING id;"
        seed['data'].each { |data| queries[1] << "DELETE FROM #{seed['table']} WHERE id IS <MISSING>;" }
      end
    end

    private

    def build_query(filename, type, &block)
      Query.new(
        *YAML
          .load(File.read(filename))[type]
          .each_with_object([[],[]]) { |table,queries| block.call(table, queries) }
          .map { |queries| queries.join("\n") })
    end

    def columns_for(table)
      table['columns']
        .map { |col| col['name'] << " " << col['type'] << (col['default'] ? " DEFAULT #{col['default']}" : '') }
        .join(', ')
    end
  end
end
