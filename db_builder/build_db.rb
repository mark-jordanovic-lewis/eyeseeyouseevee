require_relative './lib/tables.rb'
require_relative './lib/seeds.rb'
require 'pg'

conn = PG::connect(
  host: 'localhost',
  port: 5432,
  user: 'morb',
  dbname: 'morb')

db_gen = DBGenerator.new(conn)
db_gen.execute

db_seeder = DBSeeder.new(conn)
db_seeder.execute

res = conn.async_exec("SELECT * FROM content")
puts "got this:"
puts res.to_h

conn.async_exec("DROP TABLE content;")
