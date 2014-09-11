$(document).ready(function() {

  $.ajax({
    url: '/questions/index',
    method: 'GET',
    dataType: 'json'
  }).done(function(data){
    user_questions = data['questions']
    updateQuestions(user_questions);
  });


  $(".button").click(function(e){
    e.preventDefault();
    $('#question_form').show();
    $('.block_screen').show();
  });

  $('.block_screen').click(function(e){
    e.preventDefault();
    clearModal();
  });
  $('input[value="Delete Question"]').submit(function(e){
    e.preventDefault();
    console.log(e);
  })

  $('.container').on('submit', 'form.post_question', function(e){
    e.preventDefault();
    postQuestion(this);
  });
  $('.container').on('click', '.edit', function(e){
    e.preventDefault();
    var question = getQuestion($(this).text(), user_questions);
    editQuestion(question);
  })

});

//-----------------Variables-----------------------
var user_questions = [];


//-----------------VIEWS---------------------------
var clearModal = function(){
  $('#question_form').hide();
  $('#edit_question_form').hide();
  $('.block_screen').hide();
};

var postQuestion = function(instance){
  var question = $(instance).serialize();
  $.ajax({
    url: '/questions',
    method: 'POST',
    data: question,
    dataType: 'json'
    })
  .done(function(data){
    clearModal();
    $(instance)[0].reset();
    var question = [data['question']];
    updateQuestions(question);
    user_questions.push(question[0])
  });
};

var updateQuestions = function(questions){
  for(var i = 0;i<questions.length;i++){
    if (questions[i].status === 'unanswered'){
      $('#unanswered').append('<a href="#" class="edit">'+questions[i].question+'<a><br>');
    }else if (questions[i].status === 'answered'){
      $('#answered').append('<a href="#" class="edit">'+questions[i].question+'<a><br>');
    } else if (questions[i].status === 'active'){
      $('#unanswered').append('<p style="background-color:red">'+questions[i].question+'<p>');
    }
  };
};

var getQuestion = function(question, questions){
  for(var i = 0; i<questions.length;i++){
    if (question === questions[i].question){
      return questions[i];
    }
  }
};

var editQuestion = function(question){
  //TODO REFACTOR
  $("#edit_question_form input[name='question[question]']").val(question.question);
  $("#edit_question_form input[name='question[challenge_name]']").val(question.challenge_name);
  $("#edit_question_form input[name='question[error_msg]']").val(question.error_msg);
  $("#edit_question_form textarea[name='question[code]']").val(question.code);
  $("#edit_question_form input[name='question[location]']").val(question.location);
  $('#edit_question_form').show();
  $('.block_screen').show();
}
