$(function(){

  function show_user_result(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
               </div>`
    $("#user-search-result").append(html);
  }

  function show_no_user_result(message){
    var html = `<p>${message}</p>`
    $("#user-search-result").append(html);
  }

  function add_chatMember(name, id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
      $("#chat-group-users").append(html);
  }


  $(".chat-group-form__input").on("keyup", function(){
    var input = $(this).val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          show_user_result(user);
        });
      }
      else {
        show_no_user_result("一致するユーザーはいません");
      }
    })
  });

  $(document).on("click", "a.chat-group-user__btn--add",function(){
    var name = $(this).attr("data-user-name");
    var id   = $(this).attr("data-user-id");
    $(this).parent().remove();
    add_chatMember(name, id);
  })

  $(document).on("click","a.chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })
});
