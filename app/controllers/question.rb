get '/questions/index' do
  return if @user.nil?
  if @user.access == 'student' || @user.access == 'admin' #TODO => MAKE ADMIN PAGE
    json questions: @user.questions
  elsif @user.access == 'coach'
    json questions: Question.all
  end
end

post '/questions' do
  @user.questions << Question.create(params['questionData'])

  json question: @user.questions.last
end

delete '/questions' do
  Question.find(params['question']['id']).destroy();
end

put '/questions' do
  Question.find(params['question']['id']).update(params['question'])
end
