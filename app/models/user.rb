class User < ActiveRecord::Base
  validates :email, uniqueness: true
  after_initialize :defaults
  #TODO email validation

  has_many :questions
  has_many :active_questions, foreign_key: 'coach_id'

  def defaults
    self.access ||= 'student'
  end
end
