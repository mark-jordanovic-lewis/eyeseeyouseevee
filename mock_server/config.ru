require_relative 'lib/setup_app.rb'

run Rack::Cascade::new [SetupApp]
