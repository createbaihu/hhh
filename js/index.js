$(function () {


  $(".btn div").click(function () {
    $(this).slideUp()
    $(".btn").slideUp()
    var $box = $(".box");
    var index = 0 //给每个方格索引
    for (var i = 0; i < 35; i++) { //初始网格
      for (var j = 0; j < 65; j++) {
        $box.append("<div x=" + i + " y=" + j + " index=" + (index++) + "></div>")
      }
    }




    var snakeHead = $("[x=10][y=10]") //初始蛇头
    snakeHead.addClass("active")



    var snake = []  //蛇全身的坐标
    snake.push(snakeHead) //蛇头添加
    var score = 0;

    var isfood = false //界面是否有食物
    var food = null;
    var direction = 39 //默认方向 方向控制
    var speed = 100;
    var proviousdirection = 0

    $(document).keydown(function (e) { //方向控制
      proviousdirection = direction
      direction = e.keyCode
      if (snake.length >= 2) {
        if (proviousdirection == 37 && direction == 39) {
          direction = 37
        }
        if (proviousdirection == 39 && direction == 37) {
          direction = 39
        }
        if (proviousdirection == 38 && direction == 40) {
          direction = 38
        }
        if (proviousdirection == 40 && direction == 38) {
          direction = 40
        }
      }
    })

    setFood()
    setzhangai()
    movesnake()


    function setFood() {
      setInterval(function () {
        if (!isfood) {
          while (true) {
            var footX = parseInt(Math.random() * 35)
            var footY = parseInt(Math.random() * 65)
            food = $("[x=" + footX + "][y=" + footY + "]");
            if (!food.hasClass("active")) {
              if (!isfood) {
                food.addClass("food")
                isfood = true;
              }
              break;
            }
          }
        }
      }, 100)
    }

    var hh = true;
    function setzhangai() {
      setInterval(function () {
        if (hh) {
          var footXX = parseInt(Math.random() * 35)
          var footYY = parseInt(Math.random() * 65)
          var iszhangai = $("[x=" + footXX + "][y=" + footYY + "]");
          if (!iszhangai.hasClass("active") && !iszhangai.hasClass("food")) {
            iszhangai.addClass("zhangai")
          }
        }
      }, 200)

    }

    function movesnake() { //默认前进



      var timer = setInterval(function () {
        var currenthead = snake[snake.length - 1]
        var isDea = false;

        var x = currenthead.attr("x");
        var y = currenthead.attr("y");

        if (direction == 37) {
          currenthead.removeClass("active")
          currenthead.removeClass("head")
          currenthead = $("[x=" + x + "][y=" + (parseInt(y) - 1) + "]")
          if (currenthead.hasClass("active") || !currenthead[0]) {
            isDea = true
          }
        }

        if (direction == 39) {
          currenthead.removeClass("active")
          currenthead.removeClass("head")
          currenthead = $("[x=" + x + "][y=" + (parseInt(y) + 1) + "]")
          if (currenthead.hasClass("active") || !currenthead[0]) {
            isDea = true
          }
        }

        if (direction == 38) {
          currenthead.removeClass("active")
          currenthead.removeClass("head")
          currenthead = $("[x=" + (parseInt(x) - 1) + "][y=" + y + "]")
          if (currenthead.hasClass("active") || !currenthead[0]) {
            isDea = true
          }
        }

        if (direction == 40) {
          currenthead.removeClass("active")
          currenthead.removeClass("head")
          currenthead = $("[x=" + (parseInt(x) + 1) + "][y=" + y + "]")
          if (currenthead.hasClass("active") || !currenthead[0]) {
            isDea = true
          }
        }
        if (currenthead.hasClass("zhangai")) {
          isDea = true;
        }

        currenthead.addClass("active")
        $(".active").html("🤗")

        if (isDea) {
          clearInterval(timer)
          hh = false;

          $(".btn").slideDown()
          $(".btn div").slideDown()
          alert("游戏结束，最终得分" + $(".score").html())
          location.reload()
        }



        var tempSnake = []
        tempSnake.push(currenthead)
        for (var i = snake.length - 1; i >= 1; i--) {
          snake[i].addClass("active")
          tempSnake.unshift(snake[i])
        }
        snake[0].removeClass("active")
        snake[0].html("")

        snake = tempSnake

        if (snake[snake.length - 1][0] == food[0]) { //蛇头碰见食物
          $(".box>div").removeClass("zhangai")
          $(".au")[0].play()
          score += 100;
          $(".score").html(score)

          if (score >= 1000) speed = 70;
          if (score >= 2000) speed = 50;
          if (score >= 3000) speed = 30;
          if (score >= 5000) speed = 20;
          if (score >= 7000) speed = 10;
          var currenthead = snake[0]
          console.log(currenthead[0])
          var xTop = currenthead.attr("x");
          var yTop = currenthead.attr("y");
          var newBody = null;
          if (direction == 37) {
            newBody = $("[x=" + xTop + "][y=" + (parseInt(yTop) + 1) + "]")
          }
          if (direction == 39) {
            newBody = $("[x=" + xTop + "][y=" + (parseInt(yTop) - 1) + "]")
          }
          if (direction == 38) {
            newBody = $("[x=" + (parseInt(xTop) + 1) + "][y=" + yTop + "]")
          }
          if (direction == 40) {
            newBody = $("[x=" + (parseInt(xTop) - 1) + "][y=" + yTop + "]")
          }
          newBody.addClass("active")
          snake.unshift(newBody)
          food.removeClass("food")
          isfood = false
        }
      }, 150)
    }
  })
})
