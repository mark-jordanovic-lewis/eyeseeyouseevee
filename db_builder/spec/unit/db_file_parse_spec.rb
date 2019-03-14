require 'spec_helper'

describe DBFileParse do
  subject { described_class.new(db_file) }

  let(:db_file) { './spec/templates/test_table_definitions.yml' }
  let(:create_query) do
    %Q!CREATE TABLE IF NOT EXISTS _test_table_one (id SERIAL PRIMARY KEY, columnOne varchar(20), created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS _test_table_two (id SERIAL PRIMARY KEY, columnOne integer);!
  end
  let(:drop_query) do
    %Q!DROP TABLE IF EXISTS _test_table_one;
DROP TABLE IF EXISTS _test_table_two;!
  end

  it 'returns the expected string' do
    aggregate_failures do
      expect(subject.create_table_query).to eq create_query
      expect(subject.drop_table_query).to eq drop_query
    end
  end
end
