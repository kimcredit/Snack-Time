// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-status").on("click", function (event) {
    event.preventDefault();
    const id = $(this).data("id");
    const newStatus = $(this).data("newdevoured");
    const newDevouredState = { devoured: newStatus };
    $.ajax('/api/snacks/' + id, {
        type: 'PUT',
        data: newDevouredState
    }).then(() => {
        location.reload();
    });
  });
  
    $(".make-snack").on("submit", function (event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      let alert = $(".alert");
      const category = $("#category").val();
      const snack = $("#snack").val();
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
          $.ajax('api/snacks', {
              type: 'POST',
              data: newSnack
          }).then(() => {
              location.reload();
          });
      }
    });
  });
  