require 'yaml'
require 'pry'

class DBFileParse
  attr_reader :drop_table_query

  def initialize(filename)
    @filename = filename
  end

  def create_table_query
    @config ||= begin
      config, @drop_table_query = YAML
        .load(File.read(filename))['tables']
        .map do |table|
          [
            "CREATE TABLE IF NOT EXISTS #{table['name']} (#{columns_for(table)});",
            "DROP TABLE IF EXISTS #{table['name']};"
          ]
        end
        .flatten
        .partition { |query| query.match(/^CREATE/) }
        .map { |queries| queries.join("\n") }

      config
    end
  end

  private

  attr_reader :filename

  def columns_for(table)
    table['columns']
      .map { |col| col['name'] << " " << col['type'] << (col['default'] ? " DEFAULT #{col['default']}" : '') }
      .join(', ')
  end
end
