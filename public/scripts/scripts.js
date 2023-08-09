$( document ).ready(function() {
  
  /* CHECK-IN PAGES SCRIPTS */

  //handle attendee search
  $("#attendee-name").on("input", function() {
    let inputValue = $(this).val();
    let pattern = new RegExp('\\b' + inputValue, 'i');

    if (inputValue.length > 0) {
      $("#attendee-list").removeClass("closed");
    } else {
      $("#attendee-list").addClass("closed");
    }

    $(".attendee-list-item").each(function() {
      let currentText = $(this).text();
      let showListItem = pattern.test(currentText);
      let newText = currentText.replace(pattern, "<strong>$&</strong>");

      $(this).toggle(showListItem);
      $(this).html(newText);
    });

  });

  // handle selection of attendee name
  $(".attendee-list-item").click(function() {
    const text = $(this).text();
    $("#attendee-name").val(text);
    $("#attendee-list").addClass("closed");
  });


  /* ADMIN PAGES SCRIPTS */

  //delete an event
  $(".delete-event-btn").each(function() {
    $(this).click(function() {
      const eventName = $(this).data("name");
      if (confirm("Are you sure you want to delete event \"" + eventName + "\"?")) {
        $.ajax({
          type: "POST",
          url: "/admin/event/" + $(this).data("id") + "/delete",
          data: {eventId: $(this).data("id")},
          success: function (res) {
              console.log(res.response)
              location.reload();
          },
          error: function () {
              console.log('Error');
          }
      });
      }
    });
  });

  //handle add attendee button click
  $(".add-attendee-btn").click(function() {
    if ($("#attendee-form").attr("action") != "/admin/create-attendee") {
      $(".attendee-modal-title").text("New Attendee");
      $("#attendee-form").attr("action", "/admin/create-attendee");
      $("#attendee-form")[0].reset();
    }

    $(".overlay").removeClass("display-none");
    $("#attendee-modal").removeClass("display-none");
  });

  //handle close modal button click
  $(".close-modal-btn").click(function() {
    $(".overlay").addClass("display-none");
    $("#attendee-modal").addClass("display-none");
  });

  //delete an attendee
  $(".delete-attendee-btn").each(function() {
    $(this).click(function() {
      const attendeeName = $(this).data("name");
      if (confirm("Are you sure you want to delete attendee \"" + attendeeName + "\"?")) {
        $.ajax({
          type: "POST",
          url: "/admin/attendee/" + $(this).data("id") + "/delete",
          data: {attendeeId: $(this).data("id")},
          success: function (res) {
              console.log(res.response)
              location.reload();
          },
          error: function () {
              console.log('Error');
          }
      });
      }
    });
  });

  //edit an attendee
  $(".edit-attendee-btn").each(function() {
    $(this).click(function() {
      let firstName = "";
      let lastName = "";
      let deg1 = "";
      let deg2 = "";
      let deg3= "";

      $("#save-attendee-btn").text("Save Changes");
      
      $.ajax({
        type: "GET",
        url: "/admin/attendee/" + $(this).data("id") + "/update",
        success: function (res) {
          firstName = res.firstName;
          lastName = res.lastName;
          deg1 = res.degree1;
          deg2 = res.degree2;
          deg3 = res.degree3
          
          $(".attendee-modal-title").text(firstName + " " + lastName);
          $("#attendee-form").attr("action", "/admin/attendee/" + res.id + "/update");
          $("#first_name").val(firstName);
          $("#last_name").val(lastName);
          $("#degree1").val(deg1);
          $("#degree2").val(deg2);
          $("#degree3").val(deg3);
          $(".overlay").removeClass("display-none");
          $("#attendee-modal").removeClass("display-none");
        },
        error: function () {
            console.log('Error');
        }
      });
    });
  });

});

