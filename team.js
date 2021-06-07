$(document).ready(function(){

    var data = JSON.parse(localStorage.getItem("team"));
    console.log(data);
    var card1 = $("<div>").attr({
        class : "team-logo-container"
    })
    var img1 = $("<img>").attr({
        src: data.teamIcon,
        class: "team-logo"
    })
    var name1 = $("<p>").html(`<b>Team Name :</b> <span>${data.fullName}</span>`).attr({
        class: "team-name"
    })
    var key1 = $("<p>").html(`<b>key Name :</b> <span>${data.key}</span>`).attr({
        class: "team-name"
    })
    var cham1 =$("<p>").html(`<b>Championships Won : </b> <span>${data.championshipsWon}</span>`).attr({
        class: "team-name"
    })
    $(card1).append(img1,name1,key1,cham1);
    $("#team-main").append(card1);

    $("#btn-players").click(function(){
        $("#aside-1").css({
            display: "block",
            width: "40%",
        });
    })

    $("#btn-teams").click(function(){
        $("#aside-2").css({
            display: "block",
            width: "40%",
        });
    })

    $(".close").click(function(){
        $("#aside-1").css({
            display: "none",
        });
        $("#aside-2").css({
            display: "none",
        });
    })


    //player
    function createPlayer(data,i){
        var cardAbs = $("<div>").attr({
            class:"card-absolute"
        })
        var card2 = $("<div>").attr({
            class : "player-container"
        })
        var img2 =$("<img>").attr({
            class : "player-img",
            src : data.photos
        })
        var name2 =$("<p>").html(`${data.name}`).attr({
            class :"player-name"
        })
        $(card2).append(img2,name2);
        card2.click(function(){
            localStorage.setItem("player",JSON.stringify(data));
            window.location="./player.html";
        })
        if(i==0){
            let best = $("<p>").html("Best Batsman").attr({
                class: "best"
            })
            $(card2).append(best);
        }
        if(i==9){
            let best = $("<p>").html("Best Bowler").attr({
                class: "best"
            })
            $(card2).append(best);
        }
        $(cardAbs).append(card2);
        $("#team-players").append(cardAbs);
    }



    for( var i=0;i<data.players.length;i++){
        createPlayer(data.players[i],i);
    }


    
    $("#sub-1").click(function(e) {
        e.preventDefault();
        var data = JSON.parse(localStorage.getItem("teamData"));
        let n1 = $("#n1").val();//name
        let n2 = $("#n2").val();//link
        let n3 = $("#n3").val();//des
        let n4 = $("#n4").val().toUpperCase();//team
        let n5 = $("#n5").val();//role
        let n6 = $("#n6").val();//status 
        let n7 = $("#n7").val();//price
        for( let i = 0; i<=data.length; i++ ){
          if(data[i].key == n4){
             var obj = {
                id: data[i].players.length + 1,
                name : n1,
                photos : n2,
                description : n3,
                team : n4,
                role : n5,
                playingStaus: n6,
                price : n7 + " crores"
             }
             data[i].players.push(obj);
             localStorage.setItem("teamData",JSON.stringify(data));
             alert("Player Created !!");
             location.reload();
          }
          if(i == data.length){
            alert("team not found !!! --- try again or create the team first !!!");
          }
        }
      })
  
      $("#sub-2").click(function(e) {
        e.preventDefault();
        var data = JSON.parse(localStorage.getItem("teamData"));
        let n8 = $("#n8").val();//fnam
        let n9 = $("#n9").val().toUpperCase();//key
        let n10 = $("#n10").val();//cham
        let n11 = $("#n11").val().toUpperCase();//logo
        var obj = {
            id: data.length + 1,
            fullName : n8,
            key : n9,
            championshipsWon: n10,
            teamIcon : n11,
            players : [],
          }
          data.push(obj);
          localStorage.setItem("teamData",JSON.stringify(data));
          alert("Team Created !!");
          location.reload();
      })
  
      var search = document.getElementById("search-text");
      
      search.oninput = function(){
        if(search.value == ""){
          $(".search-drop").css("display", "none");
          $(".player-drop").css("display", "none");
        }
          let j = search.value.length;
          let data = JSON.parse(localStorage.getItem("teamData"));
        function createDiv(data){
          let div1 = $("<div>").attr({
            class: "search-drop"
          })
          div1.css("display", "flex")
          let img1 = $("<img>").attr({
            src : data.teamIcon,
            class : "drop-icon"
          })
          let name1 = $("<p>").html(`${data.fullName}`).attr({
            class : "drop-text"
          })
          $(div1).append(img1,name1);
          $(div1).click(function(){
            localStorage.setItem("team", JSON.stringify(data));
            window.location = "./team.html"
          })
  
          $("#search-box").append(div1);
  
  
          let player = JSON.parse(localStorage.getItem("search"));
          for(let i = 0; i < player.length; i++){
            if(data.key == player[i].team){
              let div2 = $("<div>").attr({
                class: "player-drop"
              })
              div2.css("display", "flex")
              let img2 = $("<img>").attr({
                src : player[i].photos,
                class : "drop-icon"
              })
              let name2 = $("<p>").html(`${player[i].name}`).attr({
                class : "drop-text"
              })
              $(div2).append(img2,name2);
              $(div2).click(function(){
                localStorage.setItem("player", JSON.stringify(player[i]));
                window.location = "./player.html"
              })
            $(".search-drop").append(div2);
            }
          }
        }
  
          for(let i = 0; i <data.length; i++) {
            if(data[i].fullName.toUpperCase() == search.value.toUpperCase()){
              createDiv(data[i]);
            }
            if(data[i].key.toUpperCase() == search.value.toUpperCase()){
              createDiv(data[i]);
            }
          }
      }

})