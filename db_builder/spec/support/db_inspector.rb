module DBInspector
  def created_tables
    connection
          .async_exec("select tablename from pg_tables where schemaname = 'public' and tablename like '_test_%'")
          .map { |row| row['tablename'] }
  end

  def columns_of(table)
    connection
      .async_exec("select column_name from information_schema.columns where table_name = '#{table}';")
      .map { |c| c['column_name'] }
  end
end
