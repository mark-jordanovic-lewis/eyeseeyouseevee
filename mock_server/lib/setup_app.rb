require 'sinatra/base'

# =============== #
# Single Page App # Should be admin app next dev phase
# =============== #
class SetupApp < Sinatra::Base
  get '/' do
    'oi'
  end
end
