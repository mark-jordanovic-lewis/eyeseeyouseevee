module DBErrors
  def safely(&block)
    block.call
  rescue PG::Error => err
    # this would be jsonified and sent to some logging system like kibana or logstash
    puts %Q!
    PG::Error
      severity: #{err.result.error_field( PG::Result::PG_DIAG_SEVERITY )}
      db state: #{err.result.error_field( PG::Result::PG_DIAG_SQLSTATE )}
      message:
        #{err.result.error_field( PG::Result::PG_DIAG_MESSAGE_PRIMARY )}

      statement line #: #{err.result.error_field( PG::Result::PG_DIAG_STATEMENT_POSITION )}
      file:     #{err.result.error_field( PG::Result::PG_DIAG_SOURCE_FILE )}:#{err.result.error_field( PG::Result::PG_DIAG_SOURCE_LINE )}
      function: #{err.result.error_field( PG::Result::PG_DIAG_SOURCE_FUNCTION )}
    !
  end
end
