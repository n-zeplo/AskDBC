class ActiveQuestion < ActiveRecord::Base
  validate :coach_has_coach_access_level

  belongs_to :coach, class_name: 'User'
  belongs_to :question

  def coach_has_coach_access_level
    errors.add(:coach, 'is not a coach') unless coach.access == 'coach'
  end
end
