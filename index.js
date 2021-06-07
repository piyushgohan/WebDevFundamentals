$(document).ready(function(){

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })

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

    if(localStorage.getItem("teamData") == null){
        localStorage.setItem("teamData",JSON.stringify(teamData));
    }


    function createTeam(data){
        var card =$("<div>").attr({
            class : "card-team",
        })
        var img1 = $("<img>").attr({
            class : "img-team",
            src : data.teamIcon
        })
        var div1 = $("<div>").attr({
            class : "div-team",
        })
        var name1 = $("<p>").html(`<b>Team: </b> ${data.fullName}--(${data.key})`).attr({
            class : "name-team"
        })
        var cham1 = $("<p>").html(`<b>Championship Won : </b> ${data.championshipsWon}`).attr({
            class : "cham-team"
        })
        var play1 = $("<p>").html(`<b> No. Of Players: </b> ${data.players.length}`).attr({
            class : "play-team"
        })
        $(div1).append(name1,cham1,play1);
        $(card).append(img1,div1)
        card.click(function() {
            localStorage.setItem("team",JSON.stringify(data));
            window.location = "./team.html";
        })

        $("#teams-1").append(card);
    }


    var data = JSON.parse(localStorage.getItem("teamData"));

    for(var i = 0; i<data.length ; i++){
        createTeam(data[i]);
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



});




var teamData = [
    {
      id: 1,
      fullName: "Chennai Super Kings",
      key: "CSK",
      championshipsWon: 3,
      teamIcon:
        "https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png",
      players: [
        {
          id: "1",
          name: "Suresh Raina",
          photos:
            "http://moneyball.insidesport.co/img/singleplayer/Suresh-Raina1.jpg",
          description:
            "Suresh Raina is a former Indian international cricketer. An aggressive left-handed middle-order batsman and an occasional off-spin bowler, he is also regarded as one of the best fielders in world cricket.",
          team: "CSK",
          role: "Batsman",
          playingStaus: "Playing",
          price: "11 Crore",
        },
        {
          id: "2",
          name: "Ravindra Jadeja",
          photos:
            "https://s.ndtvimg.com/images/entities/300/ravindra-jadeja-855.png",
          description:
            "Ravindrasinh Anirudhsinh Jadeja, commonly known as Ravindra Jadeja, is an Indian international cricketer. He is an all-rounder, who bats left-handed in the middle-order and bowls left-arm orthodox spin.",
          team: "CSK",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "7 crores",
        },
        {
          id: "3",
          name: "MS Dhoni",
          photos:
            "https://img.jagranjosh.com/imported/images/E/GK/MS-Dhoni-Biography.jpg",
          description:
            "Mahendra Singh Dhoni, is a former Indian international cricketer who captained the Indian national team in limited-overs formats from 2007 to 2017 and in Test cricket from 2008 to 2014",
          team: "CSK",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "15 Crores",
        },
        {
          id: "4",
          name: "Faf du Plessis",
          photos:
            "https://c.ndtvimg.com/2019-05/doq9roeg_faf-du-plessis_625x300_10_May_19.jpg",
          description:
            "Francois du Plessis is a South African international cricketer and former captain of the South Africa national cricket team. du Plessis is a right-handed middle-order batsman and part-time leg spin bowler. ",
          team: "CSK",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1.6 crore",
        },
        {
          id: "5",
          name: "Ambati Rayudu",
          photos:
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201805/Rayudu_0.jpeg?NBQCtg8Wa6ApITuWu.EOmmD464YKlrjB",
          description:
            "Ambati Thirupathi Rayudu is an Indian professional cricketer and current captain of Andhra team in Syed Mushtaq Ali T20 Tournament. He plays as a right-handed middle-order batsman, who occasionally keeps wicket and bowls right-arm off-breaks.",
          team: "CSK ",
          role: "Batsman",
          playingStaus: "Playing",
          price: "2.20 crore",
        },
        {
          id: "6",
          name: "Ruturaj Gaikwad ",
          photos: "https://etimg.etb2bimg.com/photo/79058878.cms ",
          description:
            "Ruturaj Gaikwad is an Indian cricketer. He made his first-class debut for Maharashtra in the 2016–17 Ranji Trophy on 6 October 2016. He made his Twenty20 debut for Maharashtra in the 2016–17 Inter State Twenty-20 Tournament on 2 February 2017.",
          team: "CSK ",
          role: "Batsman",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "7",
          name: "Dwayne Bravo",
          photos:
            "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/04/27/Pictures/cricket-t20-ind-ipl-hyderabad-chennai_5bbc8f5a-4a33-11e8-8699-4e17514b3033.jpg ",
          description:
            "Dwayne John Bravo is a Trinidadian cricketer who is a former captain of the West Indies cricket team. A genuine all-rounder, Bravo bats right-handed and bowls right-arm medium-fast pace. He is particularly known for his aggressive batting in the middle order, and for his death bowling. ",
          team: "CSK ",
          role: "All-Rounder ",
          playingStaus: "Playing",
          price: "6.40 crore",
        },
        {
          id: "8",
          name: "Sam Curran",
          photos:
            "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/311400/311416.6.jpg",
          description:
            "Samuel Matthew Curran is an English cricketer, who plays for Surrey County Cricket Club, and England. Curran is a left-handed batsman and left-arm medium-fast bowler.",
          team: "CSK",
          role: "All-rounder ",
          playingStaus: "Playing",
          price: "5.50 crore",
        },
        {
          id: "9",
          name: "Shardul Thakur",
          photos:
            "http://moneyball.insidesport.co/img/singleplayer/ShardulThakur1.jpg",
          description:
            "Shardul Narendra Thakur is an Indian international cricketer. He is a bowling all-rounder, who bats right-handed and bowls right-arm medium-fast. He plays first-class cricket for Mumbai and is a member of Chennai Super Kings since 2018  ",
          team: "CSK",
          role: "Bowler",
          playingStaus: "Playing",
          price: "2.60 crore",
        },
        {
          id: "10",
          name: "Deepak Chahar",
          photos: "https://images.indianexpress.com/2018/04/chahar-fb2.jpg",
          description:
            "Deepak Lokendrasingh Chahar is an Indian professional cricketer. He is a right hand medium-pace bowler and lower-order batsman, who plays for Rajasthan in domestic cricket and Chennai Super Kings in the Indian Premier League. He became the first Indian male cricketer to take a hat-trick in a Twenty20 International.",
          team: "CSK",
          role: "Bowler",
          playingStaus: "Playing",
          price: "80 lakhs",
        },
      ],
    },
    {
      id: 2,
      fullName: "Delhi Capitals",
      key: "DC",
      championshipsWon: 0,
      teamIcon:
        "https://www.searchpng.com/wp-content/uploads/2019/12/delhi-capitals-logo-PNG.jpg",
      players: [
        {
          id: "1",
          name: "Shikhar Dhawan",
          photos:
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202011/Shikhar_Dawan_PTI_Picture_1200x768.jpeg?xw5_BX86eZVtMm5woS6WviJg3e8.HaXu&size=770:433 ",
          description:
            "Shikhar Dhawan is an Indian international cricketer. A left-handed opening batsman and an occasional right-arm off break bowler, he plays for Delhi in first-class cricket and Delhi Capitals in the IPL. He played for the Indian Under-17 and Under-19 teams before making his first-class debut for Delhi in November 2004. ",
          team: "DC",
          role: "Batsman",
          playingStaus: "Playing",
          price: "5.20 crore",
        },
        {
          id: "2",
          name: "Prithvi Shaw ",
          photos:
            "https://static.toiimg.com/thumb/msid-78323865,imgsize-164782,width-400,resizemode-4/78323865.jpg ",
          description:
            "Prithvi Pankaj Shaw is an Indian professional cricketer and former India national under-19 cricket team captain. He plays for Mumbai in domestic cricket and Delhi Capitals in the Indian Premier League. ",
          team: "DC",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1.20 crore",
        },
        {
          id: "3",
          name: "Ajinkya Rahane",
          photos:
            "https://c.ndtvimg.com/2020-11/fkn4k6oo_ajinkya-rahane-batting-bcciipl_625x300_03_November_20.jpg?q=60",
          description:
            "Ajinkya Madhukar Rahane is an Indian international cricketer. He is currently the vice-captain of the Indian cricket team in Test cricket. He plays primarily as a middle-order batsman in the Test format and as a top-order batsman in white-ball forms of the game.",
          team: "DC",
          role: "Batsman",
          playingStaus: "Playing",
          price: "5.25 crore",
        },
        {
          id: "4",
          name: "Shimron Hetmyer",
          photos:
            "https://cdn-wp.thesportsrush.com/2021/04/9f5d3b73-hetmyer-not-playing-today.jpg",
          description:
            "Shimron Odilon Hetmyer is a Guyanese cricketer who plays for the West Indies cricket team. He was part of the West Indies' squad for the 2014 ICC Under-19 Cricket World Cup. In December 2015 he was named as the captain of the West Indies squad for the 2016 Under-19 Cricket World Cup.",
          team: "DC",
          role: "Batsman",
          playingStaus: "Playing",
          price: "3 crore",
        },
        {
          id: "5",
          name: "Axar Patel",
          photos:
            "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/04/03/967716-ezgif.com-gif-maker-2021-04-03t140642.922.jpg",
          description:
            "Axar Rajeshbhai Patel also spelled as Akshar Patel, is an Indian international cricketer. He plays for Gujarat in domestic cricket and for the Delhi Capitals in the Indian Premiere League. He is an all-rounder who plays as a left-handed batsman and slow left-arm orthodox bowler.",
          team: "DC",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "4.4 crore",
        },
        {
          id: "6",
          name: "Marcus Stoinis",
          photos:
            "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/09/21/926338-stoinis-dc.jpg",
          description:
            "Marcus Peter Stoinis is an Australian cricketer who plays limited overs cricket for the Australian national team. He is contracted to Western Australia and Melbourne Stars domestically, and has previously also played for Perth Scorchers and Victoria as an all rounder. ",
          team: "DC",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "6 crore",
        },
        {
          id: "7",
          name: "Kagiso Rabada",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2020/10/22175347/Kagiso-Rabada-1.jpg",
          description:
            "Kagiso Rabada is a South African international cricketer who plays all formats of the game. He made his South African debut in November 2014 in limited-overs cricket before going on to make his Test debut in November 2015.",
          team: "DC",
          role: "Bowler",
          playingStaus: "Playing",
          price: "3 crore",
        },
        {
          id: "8",
          name: "Anrich Nortje",
          photos:
            "https://static.toiimg.com/thumb/msid-78474981,imgsize-182908,width-400,resizemode-4/78474981.jpg",
          description:
            "Anrich Arno Nortje is a South African professional cricketer. He made his international debut for the South Africa cricket team in March 2019. In July 2020, Nortje was named the newcomer of the year at Cricket South Africa's annual awards ceremony.",
          team: "DC",
          role: "Bowler",
          playingStaus: "Playing",
          price: "30 lakhs",
        },
        {
          id: "9",
          name: "Ishant Sharma",
          photos:
            "https://crickettimes.com/wp-content/uploads/2020/10/Ishant-Sharma-IPL.jpg",
          description:
            "Ishant Sharma is an Indian cricketer who has represented India in Tests, ODIs and T20Is. He is a 1.93 m tall right-arm fast-medium bowler. At the age of 18, Sharma was called to join the Indian squad for the tour of South Africa in 2006–07.",
          team: "DC",
          role: "Bowler",
          playingStaus: "Playing",
          price: "1.10 crore",
        },
        {
          id: "10",
          name: "Amit Mishra",
          photos:
            "https://admin.cricplex.com/news_images/5f39c2b5c629abb9c8520b20f9d9d0fa.jpg ",
          description:
            "Amit Mishra is an Indian cricketer. He is an attacking right-arm leg-break bowler and right-handed tail-ender batsman. He plays for Haryana in the domestic Ranji Trophy and currently appears for the T20 franchise Delhi Capitals in the Indian Premier League. In addition, he has represented India in Test, ODIs and T20s ",
          team: "DC",
          role: "Bowler",
          playingStaus: "Playing",
          price: "4 crore",
        },
      ],
    },
    {
      id: 3,
      fullName: "Kolkata Night Riders",
      key: "KKR",
      championshipsWon: 2,
      teamIcon:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kolkata_Knight_Riders_Logo.svg/1200px-Kolkata_Knight_Riders_Logo.svg.png",
      players: [
        {
          id: "1",
          name: "Eoin Morgan",
          photos:
            "https://images.newindianexpress.com/uploads/user/imagelibrary/2020/9/18/w1200X800/Eoin_Morgan_PTI.jpg",
          description:
            "Eoin Joseph Gerard Morgan CBE (born 10 September 1986) is an Irish-born cricketer who captains the England cricket team in limited overs cricket, Kolkata Knight Riders in the Indian Premier League and Middlesex in the Vitality T20 Blast.",
          team: "KKR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "5.25 crore",
        },
        {
          id: "2",
          name: "Nitish Rana",
          photos:
            "https://c.ndtvimg.com/2021-04/6nciiak_nitish-rana-kkr-instagram_625x300_03_April_21.jpg",
          description:
            "Nitish Rana (born 27 December 1993) is an Indian cricketer who plays for Delhi in domestic cricket and Kolkata Knight Riders in the Indian Premier League.",
          team: "KKR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "5.5 crore",
        },
        {
          id: "3",
          name: "Shubman Gill",
          photos:
            "https://imgk.timesnownews.com/story/1556937514-Shubman-Gill-fifty-AP.png?tr=w-1200,h-900",
          description:
            "Shubman Gill (born 8 September 1999) is an Indian international cricketer who plays for Punjab in domestic cricket and for the Kolkata Knight Riders in the Indian Premier League (IPL) as a right-handed opening batsman.",
          team: "KKR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "2 crore",
        },
        {
          id: "4",
          name: "Gurkeerat Singh Mann",
          photos:
            "https://www.kkr.in/static-assets/waf-images/c2/79/a3/16-9/388-218/AHObKPy1OA.png",
          description:
            " (born 29 June 1990) is an Indian professional cricketer who plays for Punjab in domestic cricket.",
          team: "KKR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1 crore",
        },
        {
          id: "5",
          name: "Rahul Tripathi",
          photos:
            "https://www.deccanherald.com/sites/dh/files/styles/article_detail/public/articleimages/2020/10/18/pti03-10-2020000324b-903865-1603042805.jpg?itok=FH9boVMU",
          description:
            "Rahul Ajay Tripathi (born 2 March 1991) is an Indian cricketer who plays for Maharashtra in domestic cricket and Kolkata Knight Riders in IPL.",
          team: "KKR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1.4 crore",
        },
        {
          id: "6",
          name: "Dinesh Karthik",
          photos:
            "https://c.ndtvimg.com/2020-09/ps1n9vcc_dinesh-karthik-kkr-bcciipl_625x300_22_September_20.jpg",
          description:
            " Dinesh Karthik was part of the commentary team during India's home series against England. He made his debut in front of the mic for the official broadcasters of England and Wales Cricket Board. .",
          team: "KKR",
          role: "Wicket-keeper",
          playingStaus: "Playing",
          price: "4.4 crore",
        },
        {
          id: "7",
          name: "Sunil Narine",
          photos:
            "https://s01.sgp1.digitaloceanspaces.com/large/874109-84667-yafcrnikuk-1521182036.jpg",
          description:
            " Sunil Philip Narine (born 26 May 1988) is a Trinidadian cricketer who plays internationally for the West Indies. He made his One Day International (ODI) debut in December 2011 and Test match debut in June 2012.",
          team: "KKR",
          role: "Bowler",
          playingStaus: "Playing",
          price: "4.4 crore",
        },
        {
          id: "8",
          name: "Andre Dwayne Russell",
          photos:
            "https://s01.sgp1.digitaloceanspaces.com/large/874109-84667-yafcrnikuk-1521182036.jpg",
          description:
            " Andre Dwayne Russell (born 29 April 1988) is a Jamaican professional cricketer and plays internationally for the West Indies and for Jamaica in West Indian domestic cricket as an all-rounder.",
          team: "KKR",
          role: "Bowler",
          playingStaus: "Playing",
          price: "2.4 crore",
        },
        {
          id: "9 ",
          name: "Harry Gurney",
  
          photos:
            "https://images.news18.com/ibnlive/uploads/2020/08/1598449002_harry-gurney.jpg",
          description:
            " He was also named as a travelling reserve for the T20 WC in Bangladesh. Equipped with good pace and variety, Gurney is an established bowler in the county ...",
          team: "KKR",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "1 crore",
        },
        {
          id: "10",
          name: "Pat Cummins",
          photos:
            "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2020/05/pjimage-2020-05-10t110238-1589088801.jpg",
          description:
            "Patrick James Cummins is an Australian international cricketer who is currently the vice-captain of the Australia national team across all formats.",
          team: "KKR",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "15 crore",
        },
      ],
    },
    {
      id: 4,
      fullName: "Mumbai Indians",
      key: "MI",
      championshipsWon: 5,
      teamIcon:
        "https://i.pinimg.com/originals/28/09/a8/2809a841bb08827603ccac5c6aee8b33.png",
      players: [
        {
          id: "1",
          name: "Rohit Sharma",
          photos:
            "https://m.economictimes.com/thumb/msid-70119616,width-1200,height-900,resizemode-4,imgsize-160034/rohit-sharma-the-odi-cricket-phenomenon.jpg",
          description:
            "Rohit Gurunath Sharma is an Indian international cricketer who plays for Mumbai in domestic cricket and captains Mumbai Indians in the Indian Premier League.",
          team: "MI",
          role: "Batsman",
          playingStaus: "Playing",
          price: "15 crore",
        },
        {
          id: "2",
          name: "SuryaKumar Yadav",
          photos:
            "https://www.mumbaiindians.com/static-assets/waf-images/e1/dc/8e/4-3/592-444/zmDuYRMjOn.jpg",
          description:
            "Suryakumar Yadav is an Indian cricketer who plays for Mumbai and Mumbai Indians in domestic cricket.",
          team: "MI",
          role: "Batsman",
          playingStaus: "Playing",
          price: "3.2 crore",
        },
        {
          id: "3",
          name: "Ishan Kishan",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2021/03/21215925/Ishan-Kishan-e1562219253840.jpg",
          description:
            "Ishan Pranav Kumar Pandey Kishan is an Indian cricketer from Bihar. He made his international debut for the India cricket team in March 2021.",
          team: "MI",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "6.2 crore",
        },
        {
          id: "4",
          name: "Hardik Pandya",
          photos:
            "https://www.mumbaiindians.com/static-assets/images/players/small/63751.png",
          description:
            "JHardik Himanshu Pandya is an Indian international cricketer who plays for Baroda in domestic cricket and Mumbai Indians in the Indian Premier League.",
          team: "MI",
          role: "Allrounder",
          playingStaus: "Playing",
          price: "11 crore",
        },
        {
          id: "5",
          name: "Keiron Pollard",
          photos:
            "https://m.media-amazon.com/images/M/MV5BMTMzYzk4ZDctZDQyNy00YTAyLTgzMTgtMzU5MjI3MTZkMjRhXkEyXkFqcGdeQXVyMDkwNTkwNg@@._V1_.jpg",
          description:
            "Kieron Adrian Pollard is a Trinidadian cricketer. He captains the West Indies cricket team in limited overs cricket.",
          team: "MI",
          role: "Allrounder",
          playingStaus: "Playing",
          price: "5.4 crore",
        },
        {
          id: "6",
          name: "Quinton De cock",
          photos:
            "https://www.crictracker.com/wp-content/uploads/2021/01/Quinton-de-Kock-2.jpg",
          description:
            "Quinton de Kock is a South African international cricketer and former captain of the Proteas in all three formats.",
          team: "MI",
          role: "Wicket-keeper ",
          playingStaus: "Playing",
          price: "2.8 crore",
        },
        {
          id: "7",
          name: "Adam Milne",
          photos:
            "https://www.mumbaiindians.com/static-assets/images/players/small/11933.png",
          description:
            "Adam Fraser Milne is a New Zealand professional cricketer who plays limited overs cricket for the New Zealand national cricket team.",
          team: "MI",
          role: "Bowler",
          playingStaus: "Playing",
          price: "3.2 crore",
        },
        {
          id: "8",
          name: "Rahul Chahar",
          photos:
            "https://pbs.twimg.com/profile_images/1370655793406603264/3q2IKF5p_400x400.jpg",
          description:
            "Rahul Desraj Chahar (born 4 August 1999) is an Indian cricketer who plays for Rajasthan in domestic cricket.",
          team: "MI",
          role: "Bowler",
          playingStaus: "Playing",
          price: "1.9 crore",
        },
        {
          id: "9 ",
          name: "Trent Boult",
          photos:
            "https://admin.thecricketer.com/weblab/Sites/96c8b790-b593-bfda-0ba4-ecd3a9fdefc2/resources/images/site/trentboultheadshot-min.jpg",
          description:
            "Trent Alexander Boult is a New Zealand international cricketer who plays as a bowler for Northern Districts in New Zealand's domestic cricket, and New Zealand internationally.",
          team: "MI",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "3.20 crore",
        },
        {
          id: "10",
          name: "Jasprit Bumrah",
          photos:
            "https://images.financialexpress.com/2020/11/Jasprit-Bumrah.jpg",
          description:
            "In an Indian team desperately searching for a death overs bowler, Jasprit Bumrah came to the fore through the Indian Premier League, as a boon for cricket in the country.",
          team: "MI",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "7 crore",
        },
      ],
    },
    {
      id: 5,
      fullName: "Punjab Kings",
      key: "PBKS",
      championshipsWon: 0,
      teamIcon:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Punjab_Kings_logo_2021.png",
      players: [
        {
          id: "1",
          name: "Chris Gayle",
          photos:
            "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202010/chrisgaylekxipvrr_0_1200x768.jpeg?p0XjqH._B5rSDkDWT0gR9MFMlFWQ60jE&size=770:433",
          description:
            "(born 21 September 1979) is a Jamaican cricketer who plays international cricket for the West Indies. Gayle captained the West Indies Test side from 2007 to 2010.",
          team: "PBKS",
          role: "Batsman",
          playingStaus: "Playing",
          price: "4.20 crore",
        },
        {
          id: "2",
          name: "Nicholas Pooran",
          photos:
            "https://c.ndtvimg.com/2020-10/17nfssts_nicholas-pooran-kxip-bcciipl_625x300_10_October_20.jpg?q=60",
          description:
            "( /ˌpuːrɑːn/; born 2 October 1995) is a Trinidadian cricketer who plays for the West Indies cricket team in international cricket and for the Trinidad and Tobago in West Indian domestic matches.",
          team: "PBKS",
          role: "Batsman",
          playingStaus: "Playing",
          price: "4 crore",
        },
        {
          id: "3",
          name: "Mayank Agarwal",
          photos:
            "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/09/21/926344-mayank-agarwal-kxip-89.jpg",
          description:
            "(born 16 February 1991) is an Indian cricketer who plays as a right-handed top-order batsman. ",
          team: "PBKS",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1 crore",
        },
        {
          id: "4",
          name: "Sarfaraz Khan",
          photos:
            "https://ss.thgim.com/cricket/ipl/article26686635.ece/alternates/FREE_380/SARFARAZAFP",
          description:
            "Sarfaraz Khan is a young 17-year old cricketer, who plays for Mumbai in the Ranji Trophy. He was also a part of the Indian under-19 team that played in the 2014.",
          team: "PBKS",
          role: "Batsman",
          playingStaus: "Playing",
          price: "25lakhs",
        },
        {
          id: "5",
          name: "KL Rahul",
          photos:
            "https://imgk.timesnownews.com/story/KL-RAHUL-KINGS-XI-PUNJAB-IPL-2020-PTI.jpg?tr=w-600,h-450",
          description:
            "Kannur Lokesh Rahul (Kannada: ಕೆ.ಎಲ್.ರಾಹುಲ್) (born 18 April 1992) is an Indian international cricketer who plays for Karnataka in domestic cricket and captains Punjab Kings in the Indian Premier League.",
          team: "PBKS",
          role: "Wicket Keeper",
          playingStaus: "Playing",
          price: "11 crores",
        },
        {
          id: "6",
          name: "Prabhsimran Singh",
          photos:
            "https://www.espncricinfo.com/db/PICTURES/CMS/310200/310295.jpg",
          description:
            "Prabhsimran Singh born 10 August 2000) is an Indian cricketer who plays for Punjab Kings in the Indian Premier League (IPL).",
          team: "PBKS",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "55 lakhs",
        },
        {
          id: "7",
          name: "Mandeep Singh",
          photos:
            "https://static.toiimg.com/thumb/msid-78850044,imgsize-718411,width-400,resizemode-4/78850044.jpg",
          description:
            "(born 18 December 1991) is an Indian cricketer. He plays for Punjab in the top-flight of Indian cricket.",
          team: "PBKS",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "20 lakhs",
          championship: 1,
        },
        {
          id: "8",
          name: "Mohammed Shami",
          photos: "https://imgk.timesnownews.com/story/shami_ipl.png",
          description:
            "Mohammed Shami Ahmed (Hindi: मोहम्मद शमी) (born 3 September 1990) is an Indian international cricketer who plays for the Indian national cricket team. He is known as a reverse swing specialist",
          team: "PBKS",
          role: "Bowler",
          playingStaus: "Playing",
          price: "4.8 crore",
        },
        {
          id: "9",
          name: "Murugan Ashwin",
          photos:
            "https://static.toiimg.com/photo/imgsize-247309,msid-78947879/78947879.jpg ",
          description:
            "Murugan Ashwin (born 8 September 1990) is an Indian cricketer who plays for Tamil Nadu and for Punjab Kings in the Indian Premier League (IPL).",
          team: "PBKS",
          role: "Bowler",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "10",
          name: "Ravi Bishnoi",
          photos:
            "https://static.toiimg.com/thumb/msid-77970234,width-1200,height-900,resizemode-4/.jpg",
          description:
            "Murugan Ashwin (born 8 September 1990) is an Indian cricketer who plays for Tamil Nadu and for Punjab Kings in the Indian Premier League (IPL).",
          team: "PBKS",
          role: "Bowler",
          playingStaus: "Playing",
          price: "2 crore",
        },
      ],
    },
    {
      id: 6,
      fullName: "Rajasthan Royals",
      key: "RR",
      championshipsWon: 1,
      teamIcon: "https://www.rajasthanroyals.com/assets/images/RR_blue%20(1).png",
      players: [
        {
          id: "1",
          name: "Jos Buttler",
          photos:
            "https://c.ndtvimg.com/2020-09/vo4upbj_jos-buttler-rajasthan-royals-bcciipl_625x300_20_September_20.jpg ",
          description:
            "Joseph Charles Buttler MBE is an English international cricketer and current vice-captain of the England cricket team and Rajasthan Royals in limited overs cricket and the IPL respectively. He is considered by some to be England's best white ball batsman of all time. ",
          team: "RR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "4.40 crore",
        },
        {
          id: "2 ",
          name: "Manan Vohra",
          photos: "https://cricdaddy.com/wp-content/uploads/2020/08/MANAN.png",
          description:
            "Manan Vohra is an Indian cricketer. He has played for the India Under-19 cricket team. He is a resident of Chandigarh. He currently plays for Rajasthan Royals in the Indian Premier League.",
          team: "RR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "20 Lakhs ",
        },
        {
          id: "3",
          name: "Ben Stokes",
          photos:
            "https://c.ndtvimg.com/2021-04/7drf6gk8_ben-stokes-bcciipl_625x300_13_April_21.jpg?q=60",
          description:
            "Benjamin Andrew Stokes OBE is an English international cricketer and vice-captain of the England cricket team in Test cricket. Stokes was part of the England squad that won the 2019 Cricket World Cup, winning Man of the Match in the final.",
          team: "RR",
          role: "All-Rounder ",
          playingStaus: "Playing",
          price: "12.50 crore",
        },
        {
          id: "4",
          name: "Sanju Samson",
          photos:
            "https://images.newindianexpress.com/uploads/user/imagelibrary/2020/10/26/w900X450/sanju_samson_IPL_.jpg",
          description:
            "Sanju Viswanath Samson; born 11 November 1994 is an Indian international cricketer who plays for Kerala in domestic cricket and captains Rajasthan Royals in the Indian Premier League. He is a right-handed batsman and a wicketkeeper.",
          team: "RR",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "8 crore",
        },
        {
          id: "5",
          name: "Yashasvi Jaiswal",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2021/04/25104042/9S6A9454.jpg ",
          description:
            "Yashasvi Jaiswal is an Indian cricketer who plays Mumbai in domestic cricket and Rajasthan Royals in the Indian Premier League. In October 2019, he became the youngest cricketer in the world to score a List A double century.",
          team: "RR",
          role: "Batsman",
          playingStaus: "Playing",
          price: "2.40 crore",
        },
        {
          id: "6",
          name: "Chris Morris",
          photos:
            "https://images.news18.com/ibnlive/uploads/924x616/jpg/2021/05/1620299925_chris-morris-1200.jpg?impolicy=website&width=924&height=616",
          description:
            "Christopher Henry Morris is a South African professional cricketer who plays first-class and List A cricket for Titans",
          team: "RR",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "16.25 crore",
        },
        {
          id: "7",
          name: "Mustafizur Rahman",
          photos: "https://static.iplt20.com/players/210/1594.png",
          description:
            "Mustafizur Rahman is a Bangladeshi international cricketer. He is specialized as a left-arm fast-medium bowler. He has taken the most wickets in a debut One Day International series. He is the first player to win the ‘Man of the Match’ award on both Test as well as ODI debuts.",
          team: "RR",
          role: "Bowler",
          playingStaus: "Playing",
          price: "1 crore",
        },
        {
          id: "8",
          name: "Chetan Sakariya",
          photos:
            "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2021/05/chetan-sakariya-1620545611.jpg",
          description:
            "Chetan Sakariya is an Indian cricketer, a left arm fast bowler who represents Saurashtra in domestic cricket.",
          team: "RR",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "1.20 crore",
        },
        {
          id: "9",
          name: "Jaydev Unadkat",
          photos:
            "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/05/05/820312-jaydev-unadkat-pti.jpg",
          description:
            "Jaydev Dipakbhai Unadkat is an Indian professional cricketer who has played for the Indian national team. He plays for Rajasthan Royals in the Indian Premier League and for Saurashtra in domestic cricket. He represented India in the Under-19 Cricket World Cup in 2010. ",
          team: "RR",
          role: "Bowler",
          playingStaus: "Playing",
          price: "3 crore",
        },
        {
          id: "10",
          name: "Jofra Archer",
          photos:
            "https://static.toiimg.com/thumb/msid-82217388,width-1200,height-900,resizemode-4/.jpg",
          description:
            "Jofra Chioke Archer is a Barbadian-born English cricketer representing England and Sussex. In April 2019, Archer was selected to play for the England team in limited overs fixtures against Ireland and Pakistan.",
          team: "RR",
          role: "Bowler",
          playingStaus: "Playing",
          price: "7.20 crore",
        },
      ],
    },
    {
      id: 7,
      fullName: "Royal Challengers Bangalore",
      key: "RCB",
      championshipsWon: 0,
      teamIcon:
        "https://i.pinimg.com/originals/4f/f9/99/4ff99925fd51296daf76425b11c04195.jpg",
      players: [
        {
          id: "1",
          name: "Virat Kholi",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2021/03/21001855/IPL-Season-12-1.jpg",
          description:
            "A spunky, chubby teenager with gelled hair shot to fame after leading India to glory in the Under-19 World Cup at Kuala Lumpur in early 2008.",
          team: "RCB",
          role: "Batsman",
          playingStaus: "Playing",
          price: "17 crore",
        },
        {
          id: "2",
          name: "Devdutt Padikkal",
          photos:
            "https://c.ndtvimg.com/2021-04/h3b6vqfo_devdutt-padikkal-bcciipl_625x300_23_April_21.jpg",
          description:
            "(7 July 2000) is an Indian cricketer who plays for Karnataka in domestic cricket and the Royal Challengers Bangalore in the Indian Premier League.",
          team: "RCB",
          role: "Batsman",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "3",
          name: "Suyash Prabhudessai",
          photos:
            "https://ipl2021.org/wp-content/uploads/2021/03/SUYASH-1024x576.png",
          description:
            "(7 July 2000) is an Indian cricketer who plays for Karnataka in domestic cricket and the Royal Challengers Bangalore in the Indian Premier League.",
          team: "RCB",
          role: "Batsman",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "4",
          name: "KS Bharat ",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2021/03/10151433/2021-03-10-3.jpg",
          description:
            "(7 July 2000) is an Indian cricketer who plays for Karnataka in domestic cricket and the Royal Challengers Bangalore in the Indian Premier League.",
          team: "RCB",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "5",
          name: "AB de Villiers",
          photos:
            "https://c.ndtvimg.com/2020-11/klu7eku_ab-de-villiers-sad-rcb-bcciipl_625x300_07_November_20.jpg?q=60",
          description:
            "Some cricketers' rise to the top constitutes hours of perseverance and hardwork, and others' include, predominantly, an abundance of talent and natural ability. ",
          team: "RCB",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "11 crore",
        },
        {
          id: "6",
          name: "Mohammed Azharuddeen",
          photos:
            "https://www.ncrpost.com/wp-content/uploads/2021/02/f12c889dd44fa4b952a569753231182d_original.jpg",
          description: "the top constitutes hours of perseverance and hardwork.",
          team: "RCB",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "20lakh",
        },
        {
          id: "7",
          name: "Washington Sundar",
          photos:
            "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2020/09/29/928030-washington-sundar-rcb-ipl.jpg",
          description:
            "(born 5 October 1999) is an Indian international cricketer. He is a left handed batsman and right-arm off-spinner.",
          team: "RCB",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "3.2 crore",
        },
        {
          id: "8",
          name: "Shahbaz Ahmed",
          photos:
            "https://images.thequint.com/thequint%2F2021-04%2Fecf384de-dab8-41ff-86cc-a20b35ad11c1%2FMatch06__00785.JPG?rect=0%2C0%2C2974%2C1673&auto=format%2Ccompress&fmt=webp&w=480&dpr=2.6",
          description:
            "(born 12 December 1994) is an Indian cricketer.[1] He made his List A debut for Bengal in the 2018–19 Vijay Hazare Trophy on 20 September 2018.",
          team: "RCB",
          role: "All-Rounder",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "9",
          name: "Mohammed Siraj",
          photos:
            "https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/310800/310867.4.jpg",
          description:
            "(born 13 March 1994) is an Indian cricketer who plays for Hyderabad in domestic cricket, Royal Challengers Bangalore in the Indian Premier League, and the India national cricket team. ",
          team: "RCB",
          role: "Bowler",
          playingStaus: "Playing",
          price: "20 lakhs",
        },
        {
          id: "10",
          name: "Yuzvendra Chahal",
          photos:
            "https://cdn.insidesport.co/wp-content/uploads/2021/04/09205113/2020-10-03-5.jpg",
          description:
            "(born 23 July 1990) is an Indian cricketer and former chess player who represents India in both One Day Internationals (ODIs) and Twenty20 Internationals (T20Is), and has also represented India internationally in chess at youth levels.",
          team: "RCB",
          role: "Bowler",
          playingStaus: "Playing",
          price: "25 lakhs",
        },
      ],
    },
    {
      id: 8,
      fullName: "Sunrisers Hyderabad",
      key: "SRH",
      championshipsWon: 1,
      teamIcon:
        "https://www.pngfind.com/pngs/m/671-6719734_srh-ipl-team-logo-2019-hd-png-download.png",
      players: [
        {
          id: "1",
          name: "David Warner",
          photos:
            "https://c.ndtvimg.com/2019-04/2oc84lcg_david-warner-ipl-bye-afp_625x300_30_April_19.jpg",
          description:
            "David Andrew Warner is an Australian international cricketer and a former captain of the Australian national team. A left-handed opening batsman, Warner is the first Australian cricketer in 132 years to be selected for a national team in any format without experience in first-class cricket.",
          team: "SRH",
          role: "Batsman",
          playingStaus: "Playing",
          price: "12.50 crore",
        },
        {
          id: "2",
          name: "Manish Pandey",
          photos:
            "https://cricketaddictor.gumlet.io/wp-content/uploads/2021/04/Manish-Pandey-2.jpg?compress=true&quality=80&w=480&dpr=2.6",
          description:
            "Manish Krishnanand Pandey is an Indian international cricketer. He is primarily a right-handed middle-order batsman representing Karnataka in domestic cricket and Sunrisers Hyderabad in the Indian Premier League",
          team: "SRH",
          role: "Batsman",
          playingStaus: "Playing",
          price: "11 crore",
        },
        {
          id: "3",
          name: "Kane Williamson",
          photos:
            "https://static.toiimg.com/thumb/msid-77882458,width-1200,height-900,resizemode-4/.jpg",
          description:
            "Kane Stuart Williamson is a New Zealand international cricketer who is currently the captain of the New Zealand national team in all formats. He is a right-handed batsman and an occasional off spin bowler. Williamson made his first-class cricket debut in December 2007.",
          team: "SRH",
          role: "Batsman",
          playingStaus: "Playing",
          price: "3 crore",
        },
        {
          id: "4",
          name: "Jonny Bairstow",
          photos:
            "https://c.ndtvimg.com/2020-10/k8iholco_jonny-bairstow-ipl-bcci_625x300_08_October_20.jpg",
          description:
            "Jonathan Marc Bairstow is an English cricketer, who plays internationally for England and domestically for Yorkshire. Bairstow was part of the England squad that won the 2019 Cricket World Cup.",
          team: "SRH",
          role: "Wicket-Keeper",
          playingStaus: "Playing",
          price: "2.20 crore",
        },
        {
          id: "5",
          name: "Priyam Garg",
          photos: "https://images.indianexpress.com/2020/10/Garg.png",
          description:
            "Priyam Garg is an Indian cricketer. He made his List A debut for Uttar Pradesh in the 2018–19 Vijay Hazare Trophy on 19 September 2018. He made his first-class debut for Uttar Pradesh in the 2018–19 Ranji Trophy on 1 November 2018.",
          team: "SRH",
          role: "Batsman",
          playingStaus: "Playing",
          price: "1.90 crore",
        },
        {
          id: "6",
          name: "Rashid Khan",
          photos: "https://images.indianexpress.com/2020/10/rashid-srh-1.jpg",
          description:
            "Rashid Khan Arman is an Afghan cricketer and the current vice-captain of the national team. In franchise leagues, he plays for Sunrisers Hyderabad in the Indian Premier League, Adelaide Strikers in Australia's Big Bash League, Lahore Qalandars in the Pakistan Super League and the Band-e-Amir Dragons in Afghanistan",
          team: "SRH",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "9 crore",
        },
        {
          id: "7",
          name: "T Natarajan",
          photos:
            "https://www.thenewsminute.com/sites/default/files/styles/news_detail/public/T_Nattu_PTI_1200_05122020-compressed.jpg?itok=Ew8O8qiC",
          description:
            "Thangarasu Natarajan is an Indian cricketer. He made his international debut for the India cricket team in December 2020. He plays for Sunrisers Hyderabad in the Indian Premier League and for Tamil Nadu in domestic cricket.",
          team: "SRH",
          role: "Bowler",
          playingStaus: "Playing",
          price: "40 lakhs",
        },
        {
          id: "8",
          name: "Sandeep Sharma",
          photos: "https://images.indianexpress.com/2019/04/sandeep-sharma.jpg",
          description:
            "Sandeep Sharma is an Indian cricketer who plays domestic cricket for Punjab. He is a right-arm medium pace bowler. Sharma has represented India at two Under-19 World Cups - 2010 and 2012. He was also part Under-19 team that won Under-19 World Cup in 2012. He was signed up by Kings XI Punjab in 2013.",
          team: "SRH",
          role: "Bowler",
          playingStaus: "Playing",
          price: "3 crore",
        },
        {
          id: "9 ",
          name: "Shahbaz Nadeem",
          photos:
            "https://sportstar.thehindu.com/cricket/ipl/article26687287.ece/ALTERNATES/LANDSCAPE_1200/Nadeemsportzpicsbccijpg",
          description:
            "Shahbaz Nadeem is an Indian international cricketer who is a slow left-arm orthodox bowler. He made his first-class cricket debut in December 2004. He has played for Bihar Under-14 side and Indian U-19s and currently plays for Jharkhand and Sunrisers Hyderabad.",
          team: "SRH",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "3.20 crore",
        },
        {
          id: "10",
          name: "Bhuvneshwar Kumar",
          photos:
            "https://cricketaddictor.gumlet.io/wp-content/uploads/2021/03/Bhuvneshwar-Kumar.jpg?compress=true&quality=80&w=1300&dpr=2.6",
          description:
            "Bhuvneshwar Kumar Singh is an Indian international cricketer who plays all formats of the game. He plays for Uttar Pradesh in domestic cricket and for Sunrisers Hyderabad in the Indian Premier League.",
          team: "SRH",
          role: "Bowler ",
          playingStaus: "Playing",
          price: "8.50 crore",
        },
      ],
    },
  ];
  