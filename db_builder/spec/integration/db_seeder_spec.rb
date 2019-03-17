require 'spec_helper'

describe DBSeeder do
  let(:connection) { PG::connect($pg_options) }
  let(:seeds) { DBFileParse::create_seed_inserts('./') }
  it 'raises error if PG::Connection not passed as arg' do
    expect { described_class.new('./spec/templates/seeds.yml') }.to raise_error(ArgumentError)
  end

  context 'to an existing table' do
    before(:each) do
      DBGenerator.new(
        PG::connect($pg_options),
        DBFileParse::create_table_query('./spec/templates/test_table_definitions.yml').up
      ).create_tables
    end

    it 'inserts correctly when columns and values match' do
      described_class.execute(connection,seeds)
      binding.pry
      aggregate_failures do
        created_tables.each do |table|
          expect(connection.async_exec("select * from #{table};")).to be_nil
        end

      end
    end

    it 'raises an error when columns and values do not match' do

    end

    it 'inserts html content' do

    end
  end
end
