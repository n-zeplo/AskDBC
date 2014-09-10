SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email'
].join(' ')

raise RuntimeError, "You must set CLIENT_ID and CLIENT_SECRET in your server environment." unless ENV['CLIENT_ID'] && ENV['CLIENT_SECRET']

CLIENT_ID = ENV['CLIENT_ID']
CLIENT_SECRET = ENV['CLIENT_SECRET']

def client
  client ||= OAuth2::Client.new(CLIENT_ID, CLIENT_SECRET, {
                :site => 'https://accounts.google.com',
                :authorize_url => "/o/oauth2/auth",
                :token_url => "/o/oauth2/token"
              })
end