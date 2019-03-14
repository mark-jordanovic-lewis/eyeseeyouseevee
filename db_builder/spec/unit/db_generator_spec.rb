require 'spec_helper'

describe DBGenerator do
  subject { described_class.new(connection, parser) }

  let(:support_file) { '../spec/templates/test_table_definitions.yml' }
  let(:connection) { PG::connect($pg_options) }
  let(:parser) { DBFileParse.new(nil) }
  let(:create_query) do
    %Q!CREATE TABLE IF NOT EXISTS _test_table_one (id SERIAL PRIMARY KEY, columnOne varchar(20), created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS _test_table_two (id SERIAL PRIMARY KEY, columnOne integer);!
  end


  it "Can build tables" do
    aggregate_failures do
      expect(parser).to receive(:create_table_query) { create_query }
      expect(created_tables).to be_empty
      subject.create_tables_from_file
      expect(created_tables).to eq %w[_test_table_one _test_table_two]
    end
  end

  def created_tables
    connection
      .async_exec("select * from pg_tables")
      .select { |t| t['schemaname'] == 'public' && t['tablename'].match('_test_') }
      .map { |t| t['tablename'] }
  end
end
