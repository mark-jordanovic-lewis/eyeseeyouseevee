require 'pg'
require_relative './db_errors'

class DBSeeder
  include DBErrors

  def initialize(conn)
    raise ArgumentError.new("Must inject PG::Connection object") unless conn.is_a? PG::Connection
    @connection = conn
  end

  def execute
    safely do
      connection.async_exec(
        %Q!
          BEGIN;
            #{generate_content_inserts}
          COMMIT;
        !)
    end
    puts "DB Seeded"
  end

  private

  attr_reader :connection

  def insert_statement(table, columns, content)
    content.each_with_index do |ary, index|
      raise ArgumentError.new("Columns and Values do not align on insert##{i}") if ary.size != columns.size
    end
    %Q!
      INSERT INTO #{table} (#{columns.join(',')}) VALUES #{content.join(',')};
    !
  end

  def generate_content_inserts
    insert_statement(
      'content',
      ['html', 'title'],
      CONTENT_INSERTION_FILES.map { |title, file| "(#{File.read(file)},#{title})" }
      )
  end

  CONTENT_INSERTION_FILES = {
    page_one_title: './content_html/test.html',
    page_two_title: './content_html/test.html'
  }
end
