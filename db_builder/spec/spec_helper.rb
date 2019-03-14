require 'rspec'
require 'pg'

require_relative './support/db_cleaner'

Dir['./lib/*.rb'].each { |file| require file }

$test_table_name = 'db_build_test'
$pg_options = { user: 'morb', dbname: 'morb', host: 'localhost', port: 5432}

RSpec.configure do |config|

  cleaner = DBCleaner.new(
    $pg_options.merge(table: $test_table_name)
  )

  config.before(:suite) do
    # remove test DB if exists
    cleaner.remove_test_db
  end

  config.after(:suite) do
    # remove test DB if exists
    cleaner.remove_test_db
  end

end
