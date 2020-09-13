// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-status").on("click", (event) => {
      event.preventDefault();
      console.log("switch status button");

      const id = $(this).data("id");
      console.log(id);
      const newStatus = $(this).data("newstatus");
      console.log(newStatus);
      const newDevouredState = { devoured: newStatus };
      $.ajax('/api/snacks/' + id, {
          type: 'PUT',
          data: newDevouredState
      }).then(() => {
          location.reload();
      });
    });
  
    $(".make-snack").on("submit", (event) => {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      console.log("in click event");

      let alert = $(".alert");
      const category = $("#category").val();
      const snack = $("#snack").val();

      console.log("snacks " +  $("#snack"));

      console.log(category);
      console.log(snack);
      if (!category  && !snack) {
          alert.html("Please select a category and enter a snack :)");
      } else if (!category) {
          alert.html("Please select a category :)");
      } else if (!snack) {
          alert.html("Please enter a snack :)");
      } else {
          alert.html("");
          const newSnack = {
            category,
            snack
          };
          console.log(newSnack);
          $.ajax('api/snacks', {
              type: 'POST',
              data: newSnack
          }).then(() => {
            //   location.reload();
          });
      }
    });
  });
  