// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-status").on("click", (event) => {
      event.preventDefault();
      
      const id = $(this).data("id");
      const newStatus = $(this).data("newstatus");
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
  
      let alert = $(".alert");
      const category = $(".category").val().trim();
      const snack = $(".snack").val().trim();
      if (!category  && !snack) {
          alert.html("Please select a category and enter a snack :)");
      } else if (!category) {
          alert.html("Please select a category :)");
      } else if (!snack) {
          alert.html("Please enter a snack :)");
      } else {
          alert.html("");
          const newSnack = {
            category: $(".category").val().trim(),
            snack: $(".snack").val().trim()
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
  