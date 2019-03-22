require 'sinatra/base'
require 'watir'
require 'headless'
# =============== #
# Single Page App # Should be admin app next dev phase
# =============== #
class SetupApp < Sinatra::Base
  get '/' do
    "This exist at least"
    # uri = URI('http://127.0.0.1:4089')
    # head = Net::HTTP.start(uri.host, uri.port) { |http| http.head(uri.request_uri) }
    # headers 'Content-Type' => head['Content-Type']
    # stream do |out|
    #   Net::HTTP.get_response(uri) do |f|
    #     f.read_body { |ch| out << ch }
    #   end
    # end


    # nopes

    # redirect 'http://127.0.0.1:4089/', 301

    # require 'open_uri'
    # open('http://127.0.0.1:4089/').read

    # response = ""
    # Rifler::headlessly do
    #   gnome = Rifler::firefox
    #   response = gnome.goto('view-source:http://127.0.0.1:4089/')
    # end
    # response
  end
end

class Rifler
  class << self
    def firefox
      Watir::Browser.new :firefox, profile: profile
    end

    def headlessly
      headless = Headless.new
      headless.start
      yeild
    ensure
      headless.destroy
    end

    private

    def profile
      @profile ||= begin
        profile = Selenium::WebDriver::Firefox::Profile.new
        profile['browser.download.dir'] = './tmp/webdriver-downloads'
        profile['browser.download.folderList'] = 2
        profile['browser.helperApps.neverAsk.saveToDisk'] = 'application/javascript'
        profile
      end
    end
  end
end
