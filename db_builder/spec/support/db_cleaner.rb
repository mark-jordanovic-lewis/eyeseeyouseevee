require 'pg'

class DBCleaner

  def initialize(options)
    @options = options
    validate_options || raise_invalid_option_arg
  end

  def remove_test_db
    connection
      .async_exec("select * from pg_tables")
      .select { |t| t['schemaname'] == 'public' && t['tablename'].match('_test_') }
      .map { |t| t['tablename'] }
      .each { |table| connection.async_exec("DROP TABLE IF EXISTS #{table}") }
    close_connection
  end

  private

  attr_reader :options, :table
  OPTION_KEYS = %i(user dbname host port)

  def connection
    @connection ||= PG::connect(options)
  end

  def close_connection
    connection.close
    @connection = nil
  end

  def validate_options
    OPTION_KEYS.all? { |key| options.has_key? key }
  end

  def raise_invalid_option_arg
    raise ArgumentError, %Q!
      DBCleaner requires valid pg connection options:
      \tneed keys: #{OPTION_KEYS.to_s}
      \tgot keys:  #{options.keys.to_s}
    !
  end

end
