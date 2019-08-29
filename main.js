var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')

//variables globales
var zombies = []
var cuervos = []
var bombas = []
var score1 = 0;
var score2 = 0;
var score3 = 0;
var interval;
var frames = 0;
var images = {
  fondo:'./images/sprite jueg/fondoooooooooooooooooo-pixilart.png',
  piso: './images/sprite jueg/pisometr-pixilart.png',
  balas: './images/sprite jueg/player1/bala1.png', 
  bomba: './images/sprite jueg/bombas/bomba.png',
  instrucciones: './images/joseph.png'
}

class Fondo{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image ()
    this.image.src = images.fondo
    this.image.onload = () =>{ 
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "https://downloads.khinsider.com/game-soundtracks/album/metroid-samus-returns-special-edition-samus-archives/04%2520Theme%2520of%2520Samus%2520%25E2%2580%25A2%2520Metroid%2520Samus%2520Returns.mp3"
    this.music2 = new Audio()
    this.music2.src = 'https://downloads.khinsider.com/game-soundtracks/album/metroid-samus-returns-special-edition-samus-archives/04%2520Theme%2520of%2520Samus%2520%25E2%2580%25A2%2520Metroid%2520Samus%2520Returns.mp3'
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}//termina fondo

class Piso{
  constructor(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.image = new Image ()
    this.image.src = images.piso
    this.image.onload = () =>{ 
      this.draw()
    }
    }
  draw(){
    this.x-=3
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
  }
}//termina piso


class Balas{
  constructor(x=0,y=0){
    this.x = x
    this.y = y
    this.width=25
    this.height=15
    this.image = new Image()
    this.image.src = images.balas
    this.music = new Audio()
    this.music.src = "http://66.90.93.122/ost/metroid-original-soundtrack/ytrslhyv/13%20-%20shut%20down.mp3"
        }
        
        draw(){
            this.x+=18
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }

class Character{
        constructor(){
            this.balas = []
            this.x = -50
            this.y = 285
            this.gravity = 9
            this.width = 80
            this.height=150
            this.image4 = new Image()
            this.image4.src = "./images/sprite jueg/player1/samus4.png"
            this.image3 = new Image()
            this.image3.src = "./images/sprite jueg/player1/samus3.png"
            this.image2 = new Image()
            this.image2.src = "./images/sprite jueg/player1/samus2.png"
            this.image1 = new Image()
            this.image1.src = "./images/sprite jueg/player1/samus1.png"
           // this.image1.onload = this.draw
            this.theImage = this.image1
        }
        animate(){
          if(frames % 10 === 0){
              if(this.theImage === this.image1) this.theImage = this.image2
              else if(this.theImage === this.image2) this.theImage = this.image3
              else if(this.theImage === this.image3) this.theImage = this.image4
              else if(this.theImage === this.image4) this.theImage = this.image1
          }
      }
        draw(){
          if(this.y < canvas.height - 320) this.y += this.gravity
            ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
          }
        }

class Character2{
  constructor(){
      this.balas2 = []
      this.x = 40
      this.y = 285
      this.gravity = 9
      this.width = 100
      this.height=150
      this.image4 = new Image()
      this.image4.src = "./images/sprite jueg/player2/samus24.png"
      this.image3 = new Image()
      this.image3.src = "./images/sprite jueg/player2/samus23.png"
      this.image2 = new Image()
      this.image2.src = "./images/sprite jueg/player2/samus22.png"
      this.image1 = new Image()
      this.image1.src = "./images/sprite jueg/player2/samus21.png"
      // this.image1.onload = this.draw
      this.theImage = this.image1
  }
  animate(){
    if(frames % 10 === 0){
        if(this.theImage === this.image1) this.theImage = this.image2
        else if(this.theImage === this.image2) this.theImage = this.image3
        else if(this.theImage === this.image3) this.theImage = this.image4
        else if(this.theImage === this.image4) this.theImage = this.image1
    }
}
  draw(){
    if(this.y < canvas.height - 320) this.y += this.gravity
      ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
    }
}

class Balas2{
  constructor(x=0,y=0){
    this.x = x
    this.y = y
    this.width=25
    this.height=15
    this.image = new Image()
    this.image.src = images.balas
        }
        draw(){
            this.x+=18
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }

class Zombie {
  constructor(){ 
    this.x = canvas.width -50
    this.y = 240
    this.width = 150
    this.height = 200
    this.image3 = new Image()
    this.image3.src = "./images/sprite jueg/enemy/enemey3.png"
    this.image2 = new Image()
    this.image2.src = "./images/sprite jueg/enemy/enemey2.png"
    this.image1 = new Image()
    this.image1.src = "./images/sprite jueg/enemy/enemy1.png"
    // this.image1.onload = this.draw
    this.theImage = this.image1
    this.music = new Audio()
    this.music.src = ""
    }
    animate(){
      if(frames % 10 === 0){
          if(this.theImage === this.image1) this.theImage = this.image2
          else if(this.theImage === this.image2) this.theImage = this.image3
          else if(this.theImage === this.image3) this.theImage = this.image1
      }
    }
    draw(){
      this.animate()
      this.x-=3
      ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
  }
  checkCollition(soldado){
            return  (this.x < soldado.x + soldado.width) &&
                    (this.x + this.width > soldado.x) &&
                    (this.y < soldado.y + soldado.height) &&
                    (this.y + this.height > soldado.y);
        }
}

class Cuervo {
  constructor(y){ 
    this.x = canvas.width +10
    this.y = y ? y : 0
    this.width = 50
    this.height = 70
    this.image3 = new Image()
    this.image3.src = "./images/sprite jueg/metroid/metroid3.png"
    this.image2 = new Image()
    this.image2.src = "./images/sprite jueg/metroid/metroid2.png"
    this.image1 = new Image()
    this.image1.src = "./images/sprite jueg/metroid/metroid1.png"
    // this.image1.onload = this.draw
    this.theImage = this.image1
    this.music = new Audio()
    this.music.src = ""
    }
    animate(){
      if(frames % 10 === 0){
          if(this.theImage === this.image1) this.theImage = this.image2
          else if(this.theImage === this.image2) this.theImage = this.image3
          else if(this.theImage === this.image3) this.theImage = this.image1
      }
    }
    draw(){
      this.animate()
      this.x-=15
      ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
  }
  checkCollition(soldado){
            return  (this.x < soldado.x + soldado.width) &&
                    (this.x + this.width > soldado.x) &&
                    (this.y < soldado.y + soldado.height) &&
                    (this.y + this.height > soldado.y);
        }
}

class Boss {
  constructor(){ 
    this.x = canvas.width +10
    this.y = 50
    this.width = 250
    this.height = 350
    this.image4 = new Image()
      this.image4.src = "./images/sprite jueg/boss/boss4.png"
      this.image3 = new Image()
      this.image3.src = "./images/sprite jueg/boss/boss3.png"
      this.image2 = new Image()
      this.image2.src = "./images/sprite jueg/boss/boss2.png"
      this.image1 = new Image()
      this.image1.src = "./images/sprite jueg/boss/boss1.png"
      // this.image1.onload = this.draw
      this.theImage = this.image1
      this.music = new Audio()
       this.music.src = "http://66.90.93.122/ost/metroid-zero-mission/nlzfnqes/27%20-%20ridley.mp3"
  }
  animate(){
    if(frames % 10 === 0){
        if(this.theImage === this.image1) this.theImage = this.image2
        else if(this.theImage === this.image2) this.theImage = this.image3
        else if(this.theImage === this.image3) this.theImage = this.image4
        else if(this.theImage === this.image4) this.theImage = this.image1
    }
}
    draw(){
      this.x-=1
      ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
  }
  checkCollition(soldado){
            return  (this.x < soldado.x + soldado.width) &&
                    (this.x + this.width > soldado.x) &&
                    (this.y < soldado.y + soldado.height) &&
                    (this.y + this.height > soldado.y);
        }
}



class Bomba {
  constructor(x){ 
    this.x = x ? x : 0
    this.y = -100
    this.width = 60
    this.height = 60
    this.image = new Image ()
    this.image.src = images.bomba
    this.image.onload = () =>{
      this.draw()
    }
    }
    draw(){
      this.y+=5
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  checkCollition(soldado){
            return  (this.x < soldado.x + soldado.width) &&
                    (this.x + this.width > soldado.x) &&
                    (this.y < soldado.y + soldado.height) &&
                    (this.y + this.height > soldado.y);
        }
}

class Gameover {
  constructor(){ 
    this.x = 400
    this.y = 150
    this.width = 500
    this.height = 200
    this.image = new Image ()
    this.image.src = './images/sprite jueg/game over.png'
    this.image.onload = () =>{
      this.draw()
    }
    }
    draw(){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Youwin {
  constructor(){ 
    this.x = 400
    this.y = 150
    this.width = 500
    this.height = 200
    this.image = new Image ()
    this.image.src = './images/sprite jueg/youwin.png'
    this.image.onload = () =>{
      this.draw()
      this.music = new Audio()
      this.music.src = 'http://66.90.93.122/ost/metroid-mission-zero/fakyynzr/46-mission%20accomplished.mp3'
    }
    }
    draw(){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Win{
  constructor(){
    this.x = 600
    this.y = 300
    this.width = 400
    this.height = 200
    this.image7 = new Image()
    this.image7.src = "./images/sprite jueg/bombas/exp7.png"
    this.image6 = new Image()
    this.image6.src = "./images/sprite jueg/bombas/exp6.png"
    this.image5 = new Image()
    this.image5.src = "./images/sprite jueg/bombas/exp5.png"
    this.image4 = new Image()
    this.image4.src = "./images/sprite jueg/bombas/exp4.png"
    this.image3 = new Image()
    this.image3.src = "./images/sprite jueg/bombas/exp3.png"
    this.image2 = new Image()
    this.image2.src = "./images/sprite jueg/bombas/exp2.png"
    this.image1 = new Image()
    this.image1.src = "./images/sprite jueg/bombas/exp1.png"
      // this.image1.onload = this.draw
      this.theImage = this.image1
    this.music = new Audio()
    this.music.src = "./images/8-Bit-SFX_Explosion_13.mp3"
  }
  animate(){
    if(frames % 10 === 0){
        if(this.theImage === this.image1) this.theImage = this.image2
        else if(this.theImage === this.image2) this.theImage = this.image3
        else if(this.theImage === this.image3) this.theImage = this.image4
        else if(this.theImage === this.image4) this.theImage = this.image5
        else if(this.theImage === this.image5) this.theImage = this.image6
        else if(this.theImage === this.image6) this.theImage = this.image7
        else if(this.theImage === this.image7) this.theImage = this.image1
    }
}
  draw(){
    this.y-=1
    ctx.drawImage(this.theImage,this.x,this.y,this.width,this.height)
  }
}



/////////////////termina clases

//instancias
var fondo = new Fondo()
var chipHasard = new Character()
var piso = new Piso()
var zombie = new Zombie()
var cuervo = new Cuervo()
var bomba = new Bomba()
var boss = new Boss()
var gorgonita = new Character2()
var win = new Win()
var gameOverr = new Gameover()
var youWin = new Youwin()
var balas1 = new Balas()

///////funciones principales
function update (){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  fondo.draw()
  piso.draw()
  chipHasard.draw()
  gorgonita.draw()
  if(score3>50){boss.draw();fondo.music.pause();boss.music.play()}
  if(score3>120){win.draw();boss.music.pause();win.music.play()}
  if(score3>150){youWin.draw();boss.music.pause();win.music.pause();youWin.music.play();clearInterval(interval);interval=null}



  
  chipHasard.animate()
  gorgonita.animate()
  boss.animate()
  win.animate()

  
  ///////////////////////////////
  generateZombie()
  drawZombie()
  checkZombiesCollitions()

  checkZombiesCollitions2()
  ////////////////////////////
  generateCuervo()
  drawCuervo()
  checkCuervosCollitions()

  checkCuervosCollitions2()
  //////////////////////////////
  generateBomba()
  drawBombas()
  checkBombasCollitions()

  checkBombasCollitions2()
  /////////////////////////////
  balasAndBadBoss()
  balasAndBadBoss2()
  ////////////////////////////
  drawBalas()
  balasAndBadZombies()
  balasAndBadCuervos()

  drawBalas2()
  balasAndBadZombies2()
  balasAndBadCuervos2()
  ////////////////////////////
  drawScore1()
  drawScore2()
  drawScore3()
}


function start(){
  if(interval) return
  interval = setInterval(update,1000/60)
}

function gameOver(){
  clearInterval(interval)
  gameOverr.draw()
  fondo.music.pause()
  boss.music.pause()
  balas1.music.pause()
  fondo.music2.play()
  interval=null
}

////funciones auxiliares
function balasAndBadZombies(){
        chipHasard.balas.forEach(function(bala, bI){
            zombies.forEach(function(zombie, zI){
                if(zombie.checkCollition(bala)){
                    chipHasard.balas.splice(bI,1)
                    zombies.splice(zI,1)
                    score1 ++
                    score3 ++
                
              }
            })
          
        })
    }
    
    function balasAndBadCuervos(){
      chipHasard.balas.forEach(function(bala, bI){
          cuervos.forEach(function(cuervo, cI){
              if(cuervo.checkCollition(bala)){
                  chipHasard.balas.splice(bI,1)
                  cuervo.splice(cI,1)
                  cuervo.music.play()
                  score1 ++
                  score3 ++
              }
          })
      })
  }


  function balasAndBadBoss(){
    chipHasard.balas.forEach(function(bala, bI){
            if(boss.checkCollition(bala)){
                chipHasard.balas.splice(bI,1)
                score1 ++
                score3 ++
            }
        })
}

function balasAndBadBoss2(){
  gorgonita.balas2.forEach(function(bala2, bI){
          if(boss.checkCollition(bala2)){
              gorgonita.balas2.splice(bI,1)
              score2 ++
              score3 ++
          }
      })
}

  function drawScore1() {
    ctx.font = "15px 'Press Start 2P', cursive";
    ctx.fillStyle = "blue";
    ctx.fillText("Score player 1: "+score1, 38, 30);
}

function drawScore2() {
  ctx.font = "15px 'Press Start 2P', cursive";
  ctx.fillStyle = "blue";
  ctx.fillText("Score player 2: "+score2, 1000, 30);
}

function drawScore3() {
  ctx.font = "20px 'Press Start 2P', cursive";
  ctx.fillStyle = "red";
  ctx.fillText("Score: "+ score3, 550, 30);
}

  function checkCuervosCollitions(){
    cuervos.forEach(function(cuervo){
        if(cuervo.checkCollition(chipHasard)){
            var index = cuervos.indexOf(cuervo)
            cuervos.splice(index,1)
        }
    })
}

function checkBombasCollitions(){
  bombas.forEach(function(bomba){
      if(bomba.checkCollition(chipHasard)){
        gameOver()
      }
  })
}

function drawBombas(){
  bombas.forEach(function(bomba){
      bomba.draw()
  })
}

function drawBalas(){
        chipHasard.balas.forEach(function(bala){
            bala.draw()
            balas1.music.play()
        })
    }

function checkZombiesCollitions(){
        zombies.forEach(function(zombie){
            if(zombie.checkCollition(chipHasard)){
              gameOver()
            }
        })
    }

function drawZombie(){
        zombies.forEach(function(zombie){
            zombie.draw()
        })
    }


    //////////////////////////////////////////////////////////////////////player2

    function balasAndBadZombies2(){
      gorgonita.balas2.forEach(function(bala2, bI){
          zombies.forEach(function(zombie, zI){
              if(zombie.checkCollition(bala2)){
                  gorgonita.balas2.splice(bI,1)
                  zombies.splice(zI,1)
                  score2 ++
                  score3 ++
                  if(score2 > 600 ) {
                    clearInterval(interval)
                    ctx.font = "30px 'Press Start 2P', cursive";
                    ctx.fillStyle = "black";
                    ctx.fillText("Mission Complete", 400, 300);
                    ctx.fillText("score player 2: "+score2 + "!!!", 400,350)
                    interval=null
              }
            }
          })
        
      })
  }

    function balasAndBadCuervos2(){
      gorgonita.balas2.forEach(function(bala2, bI){
          cuervos.forEach(function(cuervo, cI){
              if(cuervo.checkCollition(bala2)){
                  chipHasard.balas2.splice(bI,1)
                  cuervo.splice(cI,1)
                  cuervo.music.play()
                  score2 ++
                  score3 ++
              }
          })
      })
  }


    function checkCuervosCollitions2(){
      cuervos.forEach(function(cuervo){
          if(cuervo.checkCollition(gorgonita)){
            gameOver()
          }
      })
  }


    function checkBombasCollitions2(){
      bombas.forEach(function(bomba){
          if(bomba.checkCollition(gorgonita)){
            gameOver()
          }
      })
    }


    function checkZombiesCollitions2(){
      zombies.forEach(function(zombie){
          if(zombie.checkCollition(gorgonita)){
            gameOver()
          }
      })
  }

    function drawBalas2(){
      gorgonita.balas2.forEach(function(bala2){
          bala2.draw()
          balas1.music.play()
      })
  }
    ///////////////////////////////////////////////////////////////////////////////


    function drawCuervo(){
      cuervos.forEach(function(cuervo){
          cuervo.draw()
      })
  }

function generateZombie(){
        if(frames % 200 === 0){
            zombies.push(new Zombie())
        }  
    }

    function generateCuervo(){
      if(frames % 50 === 0){
        var y = Math.floor(Math.random() * 320) + 40;
        var cuervo = new Cuervo(y)
          zombies.push(cuervo)
      }  
  }

  function generateBomba(){
    if(frames % 50 === 0){
      var x = Math.floor(Math.random() * 1600) + 80;
      var bomba = new Bomba(x)
        bombas.push(bomba)
    }  
}


///Observadores    
addEventListener('keydown',function(e){
  if(e.keyCode === 32){
    chipHasard.balas.push(new Balas(chipHasard.x+50,chipHasard.y+60))
  } 
  if(e.keyCode === 38 && chipHasard.y > 250){
    chipHasard.y -= 300
  }
  if(e.keyCode == 39){
    chipHasard.x+=39
  }
  if(e.keyCode == 37){
    chipHasard.x-=39
  }
  if(e.key == 'Enter'){
    start()
    fondo.music.play()
  }
})


addEventListener('keydown',function(e){
  if(e.keyCode === 16){
    gorgonita.balas2.push(new Balas2(gorgonita.x+50,gorgonita.y+60))
  } 
  if(e.keyCode === 87 && gorgonita.y > 250){
    gorgonita.y -= 300
  }
  if(e.keyCode == 68){
    gorgonita.x+=39
  }
  if(e.keyCode == 65){
    gorgonita.x-=39
  }
})


var instrucciones = new Image()
instrucciones.src = './images/josephh_0000_Capa-8.png'
window.onload = () => {ctx.drawImage(instrucciones,0,0,canvas.width,canvas.height)}













//// boss music http://66.90.93.122/ost/metroid-zero-mission/nlzfnqes/27%20-%20ridley.mp3

//// musica fondo http://66.90.93.122/ost/metroid-mission-zero/jhefqgug/10-spikey%20worm%20fight.mp3

//// disparos http://66.90.93.122/ost/metroid-original-soundtrack/euwpaslv/01%20-%20metroid%20title.mp3
