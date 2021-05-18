$(function () {
  loader();
  $("#users").on("click", ".btn-warning", handleUpdate);
  $("#updateSave").click(function () {
    var id = $("#updateId").val();
    var username = $("#updateUsername").val();
    var email = $("#updateEmail").val();

    $(".error").hide();
    var hasError = false;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = $("#updateEmail").val();
    if (emailaddressVal == "") {
      $("#updateEmail").after(
        '<span class="error">Please enter your email address.</span>'
      );
      hasError = true;
    } else if (!emailReg.test(emailaddressVal)) {
      $("#updateEmail").after(
        '<span class="error">Enter a valid email address.</span>'
      );
      hasError = true;
    }
    if (hasError == true) {
      return false;
    }
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users/" + id,
      data: { username, email },
      method: "PUT",
      success: function (response) {
        console.log("Res, ", response);
        loadRecipies();
        $("#updateModal").modal("hide");
      },
    });
  });
});


function loader() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET",
    success: function (response) {
      console.log(response);
      var users = $("#users");
      users.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        users.append("<div class='user' data-id='" +rec.id +"' ><p><a href='./album.html?id=" +rec.id +"'> " +rec.username +"</a></p><button type='button' data-toggle='modal' data-target='#addModal' class='btn btn-warning btn-sm float-right'>Update</button><p>Email: " +rec.email +"</p></div>");
      }
    },
  });
}
function handleUpdate() {
  console.log("UPDATE");
  var btn = $(this);
  var parentDiv = btn.closest(".user");
  let id = parentDiv.attr("data-id");
  console.log("ID", id);
  $.get(
    "https://jsonplaceholder.typicode.com/users/" + id,
    function (response) {
      $("#updateId").val(response.id);
      $("#updateUsername").val(response.title);
      $("#updateEmail").val(response.body);
      $("#updateModal").modal("show");
    }
  );
}
