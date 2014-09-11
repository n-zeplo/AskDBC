#Create Admin For the Site
User.create(email:'nzeplowitz@gmail.com', name: 'admin', access: 'admin')

#Create 5 Students
5.times do
  User.create(email: Faker::Internet.email, name: Faker::Name.name)
end

#Create 2 Questions For Each Student
2.times do
  User.all.each do |user|
    user.questions << Question.create(question: Faker::Lorem.sentence, description: Faker::Lorem.sentence)
  end
end