$(document).ready(funtion(){
  $("button").click(funtion(){


    if($("button").text() == "?"){
      $("button").text("?");
    }else{
      $("button").text("1");
    }


    $("li").toggle("slow");
  });
});
