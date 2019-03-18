require 'spec_helper'

describe DBSeeder do
  let(:connection) { PG::connect($pg_options) }
  let(:seeds) { DBFileParse::create_seed_inserts('./spec/templates/seeds.yml') }
  let(:test_tables) { %w(_test_table_one _test_table_two) }
  it 'raises error if PG::Connection not passed as arg' do
    expect { described_class.new('./spec/templates/seeds.yml') }.to raise_error(ArgumentError)
  end

  context 'to an existing table' do
    let(:trigger_query) { DBFileParse::add_trigger_and_function('./spec/templates/trigger.yml', test_tables) }
    before(:each) do
      DBGenerator.new(
        PG::connect($pg_options),
        DBFileParse::create_table_query('./spec/templates/test_table_definitions.yml'),
        trigger_query
      ).create_tables
      described_class.execute(connection,seeds)
    end

    it 'inserts correctly when columns and values match' do
      aggregate_failures do
        expect(created_tables).to eq test_tables
        created_tables.each do |table|
          expect(connection.async_exec("select * from #{table};")).not_to be_nil
        end
        expect(connection.async_exec('select test_column_1 from _test_table_one').values).to eq [['one'], ['two'], ['three'], ['four'], ['five']]
        expect(connection.async_exec('select test_column_1 from _test_table_two').values).to eq [['1'], ['2'], [nil], [nil], ['7'], ['11']]
        expect(connection.async_exec('select test_column_2 from _test_table_two').values).to eq [['string'], ['char_ary'], ['integer'], ['float'], ['timestamp'], ['date']]
        expect(connection.async_exec('select test_column_3 from _test_table_two').values).to eq [[nil], [nil], ['ping'], ['pong'], ['beep'], ['boop']]
      end
    end

    it 'updates the ids in the delete row query' do
      expect(seeds.down).to eq %Q!DELETE FROM _test_table_one WHERE id IS 1;
DELETE FROM _test_table_one WHERE id IS 2;
DELETE FROM _test_table_one WHERE id IS 3;
DELETE FROM _test_table_one WHERE id IS 4;
DELETE FROM _test_table_one WHERE id IS 5;
DELETE FROM _test_table_two WHERE id IS 1;
DELETE FROM _test_table_two WHERE id IS 2;
DELETE FROM _test_table_two WHERE id IS 3;
DELETE FROM _test_table_two WHERE id IS 4;
DELETE FROM _test_table_two WHERE id IS 5;
DELETE FROM _test_table_two WHERE id IS 6;!
    end
  end
end
