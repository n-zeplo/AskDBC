get '/questions/index' do
  json questions: @user.questions
end

post '/questions' do
  @user.questions << Question.create(params['question'])

  json question: @user.questions.last
end

delete '/questions/:id' do

end