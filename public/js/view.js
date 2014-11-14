var View = {
  //Clear Modal from Page
  clearModal: function(){
    $('#question_form').hide();
    $('#edit_question_form').hide();
    $('#answer_question_form').hide();
    $('.block_screen').hide();

  },
  //Posts new question by clearing modal and updating question list
  postQuestion: function(questions){
      View.clearModal();
      View.updateQuestions(questions);
  },
  //Updates both of the question lists with most recent question objects
  updateQuestions: function(questions){
    $('#unanswered_questions').empty();
    $('#answered_questions').empty();
    for(var i = 0;i<questions.length;i++){
      if (questions[i].status === 'unanswered'){
        $('#unanswered_questions').append('<a href="#" class="edit">'+questions[i].question.substring(0, 50)+'</a><br>');
      }else if (questions[i].status === 'answered'){
        $('#answered_questions').append('<a href="#" class="edit">'+questions[i].question.substring(0, 50)+'</a><br>');
      } else if (questions[i].status === 'active'){
        $('#unanswered_questions').append('<a href="#" class="edit" style="background-color:red;font-weight:bold;">'+questions[i].question.substring(0, 50)+'</a><br>');
      }
    }
  },

  getQuestion: function(question, questions){
    for(var i = 0; i<questions.length;i++){
      if (question.substring(0, 50) === questions[i].question.substring(0, 50)){
        return questions[i];
      }
    }
  },
  //Adds information to form so that the question can be edited.
  showEditQuestion: function(question, form_info){
    $("#"+ form_info + "_question_form input[name='question[question]']").val(question.question);
    $("#"+ form_info + "_question_form input[name='question[challenge_name]']").val(question.challenge_name);
    $("#"+ form_info + "_question_form input[name='question[error_msg]']").val(question.error_msg);
    $("#"+ form_info + "_question_form textarea[name='question[description]']").val(question.description);
    $("#"+ form_info + "_question_form textarea[name='question[code]']").val(question.code);
    $("#"+ form_info + "_question_form input[name='question[location]']").val(question.location);
    $("#"+ form_info + "_question_form").show();
    $('.block_screen').show();
  },
  //Edits the question using the form and jquery
  editQuestion: function(question){
    question.question = $("#edit_question_form input[name='question[question]']").val();
    question.challenge_name = $("#edit_question_form input[name='question[challenge_name]']").val();
    question.description = $("#edit_question_form textarea[name='question[description]']").val();
    question.error_msg = $("#edit_question_form input[name='question[error_msg]']").val();
    question.code = $("#edit_question_form textarea[name='question[code]']").val();
    question.location = $("#edit_question_form input[name='question[location]']").val();
    View.clearModal();
  },
  //Activates question when the coach picks it
  activateQuestion: function(question){
    $("#"+ question.status +" a:contains("+question.question +")").remove();
    question.status = 'active';
    View.updateQuestions([question]);
    View.clearModal();
  }
};