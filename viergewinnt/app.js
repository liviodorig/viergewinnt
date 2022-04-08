$(document).ready(function(){
    var player = 1;
    var winner = 0;
    var colors = {};
    colors[-1] = "yellow";
    colors[1] = "red";
    var count = 0;
    
    $(".zelle").each(function(){
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;


        // Wenn auf Feld geklickt wird, abwechselnd rot gelb...
        $(this).click(function(){
            if(isValid($(this).attr("id"))){
                $(this).css("background-color",colors[player])
                $(this).attr("data-player", player);
                if(checkWin(player)){
                    alert(colors[player] + "hat gewonnen!")
                    winner = player;
                }
                player *= -1;
            }
            
        });
        
    });

    /*
    function myFunction(x ,y){
        var res = x+y
        return res
    }

    var result = myFunction(3,5)
    print(result)
    */

    // Überprüfung, ob das Feld frei ist.
    function isValid(n){
    
        var id = parseInt(n)
        if(winner !== 0){
            if($("#" + id).attr("data-player") === "0"){
                if(id >= 35) {
                    return true;
                }
                if($("#" + (id + 7)).attr("data-player") !== 0) {
                    return true;
                }
        }
        return false;
    }

    function colorBg(){
        //S"document.body.style.backgroundColor = '#eaeae6';"
    }


    function checkWin(p){
        // Überprüfung Reihen
        var line = 0;
        for(var i = 0; i < 42; i+=7){
            for(var j = 0; j < 7; j++){
            var cell = $("#" + (i+j))
                if(cell.attr("data-player") == p){
                    line++;
                }else{
                    line = 0;
                }

                if(line >= 4){
                    return true;
                }  
            }      
            line = 0;

        }

        // Überprüfung Spalten
        line = 0;
        for(var i = 0; i < 7; i++){
            for(var j = 0; j < 42; j+=7){
                var cell = $("#" + (i + j));
                if(cell.attr("data-player") == p){
                    line++;
                }else{
                    line = 0;
                }

                if(line >= 4){
                    return true;
                }
            }

            line = 0;
        }

        // Überprüfung diagonal
        var topLeft = 0;
        var topRight = topLeft + 3;

        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 4; j++){
                if($("#" + topLeft).attr("data-player") == p
                && $("#" + (topLeft + 8)).attr("data-player") == p
                && $("#" + (topLeft + 16)).attr("data-player") == p
                && $("#" + (topLeft + 24)).attr("data-player") == p){
                    return true;
                }

                if($("#" + topRight).attr("data-player") == p
                && $("#" + (topRight + 6)).attr("data-player") == p
                && $("#" + (topRight + 12)).attr("data-player") == p
                && $("#" + (topRight + 18)).attr("data-player") == p){
                    return true;
                }

                topLeft++;
                topRight = topLeft + 3;
            }
            topLeft = i * 7 + 7;
            topRight = topLeft + 3;
        }


        return false;
    }

});
