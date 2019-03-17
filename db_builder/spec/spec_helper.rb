require 'rspec'
require 'pg'

require_relative './support/db_cleaner'
require_relative './support/db_inspector'

Dir['./lib/*.rb'].each { |file| require file }

include DBInspector
$pg_options = { user: 'morb', dbname: 'morb', host: 'localhost', port: 5432}

RSpec.configure do |config|
  # ================= #
  # Database Cleaning #
  # ================= #
  cleaner = DBCleaner.new($pg_options)
  config.before(:suite) { cleaner.remove_test_db }
  config.after(:each) { cleaner.remove_test_db }
end
