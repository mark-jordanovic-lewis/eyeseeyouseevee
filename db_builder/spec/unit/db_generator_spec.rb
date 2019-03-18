require 'spec_helper'

describe DBGenerator do
  subject { described_class.new(connection, double(DBFileParse::Query, up: create_query)) }

  let(:connection) { PG::connect($pg_options) }
  let(:create_query) do
    %Q!CREATE TABLE IF NOT EXISTS _test_table_one (id SERIAL PRIMARY KEY, test_column_1 varchar(20), created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS _test_table_two (id SERIAL PRIMARY KEY, test_column_1 integer, test_column_2 varchar(20), test_column_3 varchar(20));!
  end

  context 'incorrect args' do
    it 'raises exception' do
      expect { described_class.new("", create_query) }.to raise_error(ArgumentError)
    end
  end

  context 'correct arguments' do
    it "builds tables" do
      aggregate_failures do
        expect(created_tables).to be_empty
        subject.create_tables
        expect(created_tables).to eq %w[_test_table_one _test_table_two]
      end
    end

    it "builds correct columns" do
      subject.create_tables
      columns = created_tables.map { |table| columns_of(table) }
      aggregate_failures do
        expect(columns[0]).to eq %w(id test_column_1 created_at)
        expect(columns[1]).to eq %w(id test_column_1 test_column_2 test_column_3)
      end
    end
  end
end
