before do
  @user = User.find(session[:current_user]) if session[:current_user]
end