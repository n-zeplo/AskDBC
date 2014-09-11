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

  user_info = JSON.parse(response.body)
  p response.inspect
  puts access_token.inspect
  puts user_info
  @user = User.find_or_create_by(email: user_info["email"], name: user_info["name"], picture: user_info["picture"]  )
  session[:current_user] = @user.id

  redirect "/users/#{session[:current_user]}"
end
