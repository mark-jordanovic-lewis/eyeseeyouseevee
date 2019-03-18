require 'yaml'
require 'pry'

class DBFileParse

  class Query
    attr_reader :up, :down
    def initialize(up, down)
      @up = up
      @down = down
    end
  end

  class << self
    def create_table_query(filename)
      build_query filename, 'tables' do |table, queries| # add the trigger link here
        queries[0] << "CREATE TABLE IF NOT EXISTS #{table['name']} (#{columns_for(table)});"
        queries[1] << "DROP TABLE IF EXISTS #{table['name']};"
      end
    end

    def create_seed_inserts(filename)
      insert = build_query filename, 'seeds' do |seed, queries|
        queries[0] << "INSERT INTO #{seed['table']} (#{seed['columns'].join(', ')}) VALUES #{values(seed['data'])} RETURNING id;"
        seed['data'].each { |data| queries[1] << "DELETE FROM #{seed['table']} WHERE id IS <MISSING>;" }
      end
      insert.instance_variable_set(:@up, 'BEGIN;' << insert.up << 'COMMIT;')
      insert
    end

    # put these both in a transaction and have a real down trigger query
    def add_trigger_and_function(filename, trigger_tables, drop_function=false)
      build_query filename, 'triggers' do |seed, queries|
        queries[0] << %Q!BEGIN;
        CREATE OR REPLACE FUNCTION #{seed['name']}() RETURNS #{seed['function']['return']} AS $$
        BEGIN
          #{seed['function']['sql']}
        END;
        $$ LANGUAGE plpgsql;
        #{Array(trigger_tables).map do |table|
          "CREATE TRIGGER #{seed['name']} #{seed['trigger']['event'].gsub('<TRIGGERTABLE>', table)} #{seed['trigger']['execute']} #{seed['name']}();"
        end.join("\n")}
        COMMIT;!
        queries[1] << Array(trigger_tables).map { |table| "DROP TRIGGER IF EXISTS #{seed['name']} ON #{table};\n" } << (drop_function ? "DROP FUNCTION IF EXISTS #{seed['name']};" : '')
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

    def values(data)
      fix_strings = lambda { |l| l.map{ |entry| entry.is_a?(String) ? "'" << entry << "'" : entry }.join(',') }
      "(#{data.map{ |line| fix_strings.call(line) }.join('),(')})"
    end

    def columns_for(table)
      table['columns']
        .map { |col| col['name'] << " " << col['type'] << (col['default'] ? " DEFAULT #{col['default']}" : '') }
        .join(', ')
    end
  end
end
