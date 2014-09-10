get '/' do
  erb :index
end

get '/signout' do
  session[:current_user] = nil
  redirect '/'
end

get "/auth" do
  redirect client.auth_code.authorize_url(:redirect_uri => 'http://localhost:9393/callback',:scope => 'https://www.googleapis.com/auth/userinfo.email',:access_type => "offline")
end

get '/callback' do

  access_token = client.auth_code.get_token(params[:code], :redirect_uri => 'http://localhost:9393/callback')
  response = access_token.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json')
  puts "START"
  puts '*' * 40
  p user_info = JSON.parse(response.body)
  #=> user_info is {"id"=>"108553686725590595849", "email"=>"nzeplowitz@gmail.com", "verified_email"=>true, "name"=>"Nathan Zeplowitz", "given_name"=>"Nathan", "family_name"=>"Zeplowitz", "link"=>"https://plus.google.com/108553686725590595849", "picture"=>"https://lh6.googleusercontent.com/-ljNCYRCxZ0g/AAAAAAAAAAI/AAAAAAAAAuk/r6hMRgwCzD0/photo.jpg", "gender"=>"male"}
  redirect "/#{session[:current_user]}"
end