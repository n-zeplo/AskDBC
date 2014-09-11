function Controller (view){
  var user_questions = [];
  this.view = view;

  $.ajax({
    url: '/questions/index',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){
    user_questions = data['questions'];
    view.updateQuestions(user_questions);
  });

  $(".button").click(function(e){
    e.preventDefault();
    $('#question_form').show();
    $('.block_screen').show();
  });

  $('.block_screen').click(function(e){
    e.preventDefault();
    view.clearModal();
  });

  $('button').click(function(e){
    e.preventDefault();
    var question = view.getQuestion($("form.edit_question input[name='question[question]']").val(), user_questions);
    if ($(this).attr('name') === 'delete'){
      view.deleteQuestion(question);
    } else if (($(this).attr('name') === 'push_edit')){
      view.editQuestion(question);
    } else if (($(this).attr('name') === 'activate')){
      view.activateQuestion(question);
    }
  });

  $('form.post_question').submit( function(e){
    e.preventDefault();
    view.postQuestion(this, user_questions);
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

}













