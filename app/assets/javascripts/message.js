$(function(){
  function buildHTML(message){
    if (message.image) {
      var post_url = `<img class="lower-message__image", src= '${message.image}'>`
    }
    else {
      var post_url = `<div class="lower-message__image">`
    }
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${ message.user_name }
                      </div>
                      <div class="upper-message__date">
                        ${ message.created_at }
                      </div>
                    </div>
                    <div class="lower-meesage">
                      <div class="lower-message__content">
                        ${ message.content }
                      </div>
                      ${ post_url }
                      </div>
                    </div>
                  </div>`
      return html;
  }
   function scroll_to_bottom(){
    $('.messages').animate({scrollTop: $('.messages')[0].height()}, 1500);
    return false;
  }
   $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    });
  });
   setInterval(function(){
    var url = location.href;
    $.ajax({
      url: location.href,
      type: "GET",
      dataType: 'json'
    })
    .done(function(messages) {
      $(".messages").empty();
      if (messages.length !== 0) {
        messages.forEach(function(message){
          var html = buildHTML(message);
          $(".messages").append(html);
        });
      }
    })
    .fail(function(messages){
      alert('自動更新に失敗しました');
    })
   },5000);
});
