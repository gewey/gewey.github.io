const pageExecute = {
  fileContents: "Null",
  pagePrefix: "Null",
  slides: "Null",

  init: function() {
    $.ajax({
      url: "https://gewey.github.io/bookmarks/games/warcraft/macros-cache.html",
      success: function(result) {
        $("#div1").html(result);
      }
    });
  }
};
