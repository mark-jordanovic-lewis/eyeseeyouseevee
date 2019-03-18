require 'spec_helper'

describe DBFileParse do
  describe 'Table Creation Query' do
    let(:db_file) { './spec/templates/test_table_definitions.yml' }
    let(:create_query) do
      %Q!CREATE TABLE IF NOT EXISTS _test_table_one (id SERIAL PRIMARY KEY, test_column_1 varchar(20), created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS _test_table_two (id SERIAL PRIMARY KEY, test_column_1 integer, test_column_2 varchar(20), test_column_3 varchar(20));!
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
      %Q!BEGIN;INSERT INTO _test_table_one (test_column_1) VALUES ('one'),('two'),('three'),('four'),('five') RETURNING id;
INSERT INTO _test_table_two (test_column_1, test_column_2) VALUES (1,'string'),(2,'char_ary') RETURNING id;
INSERT INTO _test_table_two (test_column_2, test_column_3) VALUES ('integer','ping'),('float','pong') RETURNING id;
INSERT INTO _test_table_two (test_column_1, test_column_2, test_column_3) VALUES (7,'timestamp','beep'),(11,'date','boop') RETURNING id;COMMIT;!
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

  describe 'Trigger and Function Query' do
    let(:trigger_tables) { %w(_test_trigger_table1 _test_trigger_table2) }
    let(:trigger_file) { './spec/templates/trigger.yml' }
    let(:trigger_up) do
      %Q!BEGIN;
        CREATE OR REPLACE FUNCTION tmp_id_table() RETURNS trigger AS $$
        BEGIN
          create table if not exists insert_ids (ins_id integer);
insert into insert_ids (ins_id) values (new.id);
return(new);

        END;
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER tmp_id_table after insert on _test_trigger_table1 for each row execute procedure tmp_id_table();
CREATE TRIGGER tmp_id_table after insert on _test_trigger_table2 for each row execute procedure tmp_id_table();
        COMMIT;!
    end
    let(:trigger_down) do
      %Q!DROP TRIGGER IF EXISTS tmp_id_table ON _test_trigger_table1;\n
DROP TRIGGER IF EXISTS tmp_id_table ON _test_trigger_table2;\n\n!
    end

    it 'builds the trigger and function queries' do
      query = described_class.add_trigger_and_function(trigger_file, trigger_tables)
      aggregate_failures do
        expect(query.up).to eq trigger_up
        expect(query.down).to eq trigger_down
      end
    end
  end
end
