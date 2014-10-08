class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question, null: false
      t.string :description
      t.string :challenge_name
      t.string :error_msg
      t.string :location
      t.string :code
      t.string :status
      t.string :answer
      t.references :user

      t.timestamps
    end
  end
end
