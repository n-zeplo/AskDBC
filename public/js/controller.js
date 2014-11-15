function Controller(view){
  //Controller Object that has all controll over question objects
  var user_questions = [];
  this.view = view;

  //Initial AJAX call to get all of the users questions on page load
  $.ajax({
    url: '/questions/index',
    method: 'GET',
    dataType: 'json',
  }).done(function(data){
    user_questions = data['questions'];
    view.updateQuestions(user_questions);
  });

  //Shows the question form modal
  $(".button").click(function(e){
    e.preventDefault();
    $('#question_form').show();
    $('.block_screen').show();
  });

  //If the user clicks the modal block screen it hides the modal
  $('.block_screen').click(function(e){
    e.preventDefault();
    view.clearModal();
  });

  //Checks for button click on the modal and makes the appropriate action based on its name attr
  $('button').click(function(e){
    e.preventDefault();
    var question = view.getQuestion($("form.edit_question input[name='question[question]']").val(), user_questions);
    if ($(this).attr('name') === 'delete'){
      questionMethods.deleteQuestion(question);
    } else if (($(this).attr('name') === 'push_edit')){
      view.editQuestion(question);
      $.ajax({
        url: '/questions',
        method: "PUT",
        data: {question: question}
      });
    } else if (($(this).attr('name') === 'activate')){
      view.activateQuestion(question);
      $.ajax({
        url: '/questions',
        method: "PUT",
        data: {question: question}
      });
    }
  });

  //Creates the question and Posts it.
  $('form.post_question').submit( function(e){
    e.preventDefault();
    var instance = this;
    var questionData = $(instance).serialize();
    $.ajax({
      url: '/questions',
      method: 'POST',
      data: questionData, //params[:question]
      dataType: 'json'
      })
    .done(function(data){
      $(instance)[0].reset();
      var question = [data['question']];
      user_questions.push(question[0]);
      view.postQuestion(user_questions);
    });
  });

  $('.container').on('click', '.edit', function(e){
    e.preventDefault();
    var question = view.getQuestion($(this).text(), user_questions);
    var attribute = $(this).closest('div').parent().closest('div').attr('id');
    if (attribute === 'coach') {
      view.showEditQuestion(question, 'answer');
    } else {
      view.showEditQuestion(question, 'edit');
    }
  });

  var questionMethods = {
    deleteQuestion: function(question){
      var index = user_questions.indexOf(question);
      if (index > -1){
        user_questions.splice(index, 1);
      }
      $.ajax({
        url: '/questions',
        method: 'DELETE',
        data: {question: question},
      }).done(function(){
        view.clearModal();
        view.updateQuestions(user_questions);
      });
    }
  };
}

