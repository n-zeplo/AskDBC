class Question < ActiveRecord::Base
  after_initialize :defaults
  belongs_to :user
  has_many :active_questions

  def defaults
    self.status ||= 'unanswered'
  end
end
