get '/users/:id' do
  if @user.access == 'student'
    erb :'/users/student_index'
  elsif @user.access == 'coach'
    erb :'/users/coach_index'
  elsif @user.access == 'admin'
    @users = Users.all
    erb :'/users/admin_index'
  end
end

get '/users/post' do

  erb :'/users/_question_form', layout: false
end