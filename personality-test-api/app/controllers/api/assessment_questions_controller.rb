class Api::AssessmentQuestionsController < ApplicationController
  @@assessment_questions ||= JSON.parse(File.read('db/questions.json')).dig('assessment_questions')

  def index 
    render json: { assessment_questions: @@assessment_questions }, status: :ok
  end
end
