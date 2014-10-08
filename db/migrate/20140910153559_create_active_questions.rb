class CreateActiveQuestions < ActiveRecord::Migration
  def change
    create_table :active_questions do |t|
      t.references :user, null: true
      t.references :question, null: true

      t.timestamps
    end
  end
end
