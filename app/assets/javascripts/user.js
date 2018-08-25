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
        show_no_user_result("ユーザー検索に失敗しました");
      }
    })
  });

  $(document).on("click", "a.user-search-add",function(){
    console.log("できました")
  })
});
