var View = {
  clearModal: function(){
    $('#question_form').hide();
    $('#edit_question_form').hide();
    $('#answer_question_form').hide();
    $('.block_screen').hide();

  },

  postQuestion: function(instance, user_questions){
    var question = $(instance).serialize();
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: question,
      dataType: 'json'
      })
    .done(function(data){
      View.clearModal();
      $(instance)[0].reset();
      var question = [data['question']];
      View.updateQuestions(question);
      user_questions.push(question[0])
    });
  },

  updateQuestions: function(questions){
    for(var i = 0;i<questions.length;i++){
      if (questions[i].status === 'unanswered'){
        $('#unanswered').append('<a href="#" class="edit">'+questions[i].question.substring(0, 50)+'</a><br>');
      }else if (questions[i].status === 'answered'){
        $('#answered').append('<a href="#" class="edit">'+questions[i].question.substring(0, 50)+'</a><br>');
      } else if (questions[i].status === 'active'){

        $('#unanswered').append('<a href="#" class="edit" style="background-color:red;font-weight:bold;">'+questions[i].question.substring(0, 50)+'</a><br>');
      }
    };
  },

  getQuestion: function(question, questions){
    for(var i = 0; i<questions.length;i++){
      if (question.substring(0, 50) === questions[i].question.substring(0, 50)){
        return questions[i];
      }
    }
  },

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

  deleteQuestion: function(question){
    $("#"+ question.status +" a:contains("+question.question +")").remove();
    $.ajax({
      url: '/questions',
      method: 'DELETE',
      data: {question: question},
    }).done(function(){
      View.clearModal();
    });
  },

  editQuestion: function(question){
    question.question = $("#edit_question_form input[name='question[question]']").val();
    question.challenge_name = $("#edit_question_form input[name='question[challenge_name]']").val();
    question.description = $("#edit_question_form textarea[name='question[description]']").val();
    question.error_msg = $("#edit_question_form input[name='question[error_msg]']").val();
    question.code = $("#edit_question_form textarea[name='question[code]']").val();
    question.location = $("#edit_question_form input[name='question[location]']").val();
    View.clearModal();
    $.ajax({
      url: '/questions',
      method: "PUT",
      data: {question: question}
    })
  },
}