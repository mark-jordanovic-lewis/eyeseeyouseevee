require 'spec_helper'

describe DBFileParse do
  describe 'Table Creation Query' do
    let(:db_file) { './spec/templates/test_table_definitions.yml' }
    let(:create_query) do
      %Q!CREATE TABLE IF NOT EXISTS _test_table_one (id SERIAL PRIMARY KEY, columnOne varchar(20), created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS _test_table_two (id SERIAL PRIMARY KEY, columnOne integer, columnTwo varchar(20), columnThree varchar(20));!
    end
    let(:drop_query) do
      %Q!DROP TABLE IF EXISTS _test_table_one;
DROP TABLE IF EXISTS _test_table_two;!
    end
    let(:query) { described_class.create_table_query(db_file) }

    context 'well formed yaml' do
      it 'returns the Query object with expected strings' do
        aggregate_failures do
          expect(query.class).to eq DBFileParse::Query
          expect(query.up).to eq create_query
          expect(query.down).to eq drop_query
        end
      end
    end

    context 'malformed yaml' do

    end
  end

  describe 'Insertion Query' do
    let(:query) { described_class.create_seed_inserts(db_file) }
    let(:db_file) { './spec/templates/seeds.yml' }
    let(:up_query) do
      %Q!INSERT INTO _test_table_one (columnone) VALUES (one),(two),(three),(four),(five) RETURNING id;
INSERT INTO _test_table_two (columnone, columntwo) VALUES (1,string),(2,char_ary) RETURNING id;
INSERT INTO _test_table_two (columntwo, columnthree) VALUES (integer,ping),(float,pong) RETURNING id;
INSERT INTO _test_table_two (columnone, columntwo, columnthree) VALUES (7,timestamp,beep),(11,date,beep) RETURNING id;!
    end
    let(:down_query) do
      %Q!DELETE FROM _test_table_one WHERE id IS <MISSING>;
DELETE FROM _test_table_one WHERE id IS <MISSING>;
DELETE FROM _test_table_one WHERE id IS <MISSING>;
DELETE FROM _test_table_one WHERE id IS <MISSING>;
DELETE FROM _test_table_one WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;
DELETE FROM _test_table_two WHERE id IS <MISSING>;!
    end

    it 'generates the correct up and down queries' do
      aggregate_failures do
        expect(query.up).to eq up_query
        expect(query.down).to eq down_query
      end
    end
  end
end
