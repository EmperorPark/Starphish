var canvas = document.getElementById("drawCanvas");
    var context = canvas.getContext("2d");
    var text = "고슴도치";

    context.font ="35pt Fira";
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillText(text, 1, 40);