

var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//variables globales
var zombies = []
var cuervos = []
var bombas = []
var score1 = 0;
var score2 = 0;
var interval;
var frames = 0;
var images = {
  fondo:'https://art.pixilart.com/b1cba2e0287f955.png',
  comandante :'https://art.pixilart.com/f918c10aafbd1c5.png',
  piso: 'https://art.pixilart.com/b443ba4e271a644.png',
  pajaro: 'https://art.pixilart.com/f8ad179027578d7.png',
  zombie: 'https://art.pixilart.com/22d203f96b0d188.png',
  balas: 'https://art.pixilart.com/d4308951377cb66.png',
  bomba: 'https://vignette.wikia.nocookie.net/growtopia/images/3/36/Big_bomb.png/revision/latest?cb=20131231104254',
  boss: 'https://steamusercontent-a.akamaihd.net/ugc/858353348243107330/26976D5F26C812DFCE4E2E84C3250E86E2F8CA3B/'
}

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
    this.x--
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)
  }
}//termina piso

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
    this.music.src = "http://66.90.93.122/ost/super-smash-bros.-for-nintendo-3ds-and-wii-u-vol-26.-street-fighter/movwjvzt/05.%20Ryu%20Stage%20Type%20B.mp3"
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}//termina fondo

class Balas{
  constructor(x=0,y=0){
    this.x = x
    this.y = y
    this.width=50
    this.height=50
    this.image = new Image()
    this.image.src = images.balas
        }
        draw(){
            this.x+=10
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }

class Character{
        constructor(){
            this.balas = []
            this.x = 40
            this.y = 205
            this.width = 120
            this.height=200
            this.image = new Image()
            this.image.src = "https://vignette.wikia.nocookie.net/contra/images/f/f6/BillRizerContraNES.png/revision/latest?cb=20171207035053"
          this.image.onload = () =>{
      this.draw()
    }
    this.gravity = 9
        }
        draw(){
          if(this.y < canvas.height - 420) this.y += this.gravity
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
          }
}

class Character2{
  constructor(){
      this.balas2 = []
      this.x = 70
      this.y = 205
      this.width = 120
      this.height=200
      this.image = new Image()
      this.image.src = "https://vignette.wikia.nocookie.net/contra/images/f/f6/BillRizerContraNES.png/revision/latest?cb=20171207035053"
    this.image.onload = () =>{
this.draw()
}
this.gravity = 9
  }
  draw(){
    if(this.y < canvas.height - 420) this.y += this.gravity
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Balas2{
  constructor(x=0,y=0){
    this.x = x
    this.y = y
    this.width=50
    this.height=50
    this.image = new Image()
    this.image.src = images.balas
        }
        draw(){
            this.x+=10
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }

class Zombie {
  constructor(){ 
    this.x = canvas.width -50
    this.y = 380
    this.width = 150
    this.height = 200
    this.image = new Image ()
    this.image.src = images.zombie
    this.image.onload = () =>{
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "http://soundbible.com/mp3/Mummy Zombie-SoundBible.com-1966938763.mp3"
    }
    draw(){
      this.x-=5
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
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
    this.width = 80
    this.height = 100
    this.image = new Image ()
    this.image.src = images.pajaro
    this.image.onload = () =>{
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "https://sonidosdeanimales.net/wp-content/uploads/2015/09/cuervo.mp3"
    }
    draw(){
      this.x-=15
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
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
    this.y = 80
    this.width = 350
    this.height = 500
    this.image = new Image ()
    this.image.src = images.boss
    this.image.onload = () =>{
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "https://sonidosdeanimales.net/wp-content/uploads/2015/09/cuervo.mp3"
    }
    draw(){
      this.x-=2
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
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
    this.width = 80
    this.height = 80
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
/////////////////termina clases

//instancias
var chipHasard = new Character()
var piso = new Piso()
var zombie = new Zombie()
var fondo = new Fondo()
var cuervo = new Cuervo()
var bomba = new Bomba()
var boss = new Boss()
var gorgonita = new Character2()


///////funciones principales
function update (){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  fondo.draw()
  piso.draw()
  chipHasard.draw()
  gorgonita.draw()
  
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
 // if(score>10)drawBoss()
  //balasAndBadBoss()

  //balasAndBadBoss2()
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
}


function start(){
  if(interval) return
  interval = setInterval(update,1000/60)
}

/*function gameOver(){
  clearInterval(interval)
  ctx.font = ('90px Avenir')
  ctx.fillText('Game Over', 50 ,250)
  interval=null
}*/

////funciones auxiliares
function balasAndBadZombies(){
        chipHasard.balas.forEach(function(bala, bI){
            zombies.forEach(function(zombie, zI){
                if(zombie.checkCollition(bala)){
                    chipHasard.balas.splice(bI,1)
                    zombies.splice(zI,1)
                    zombie.music.play()
                    score1 ++
                    if(score1 > 5 ) {
                      clearInterval(interval)
                      ctx.font = "30px 'Press Start 2P', cursive";
                      ctx.fillStyle = "black";
                      ctx.fillText("Mission Complete", 400, 300);
                      ctx.fillText("score player 1: "+score1 + "!!!", 400,350)
                      interval=null
                }
              }
            })
          
        })
    }

    function balasAndBadBoss(){
      chipHasard.balas.forEach(function(bala, bI){
              if(boss.checkCollition(bala)){
                  chipHasard.balas.splice(bI,1)
                  score1 ++
              }
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
              }
          })
      })
  }

  function drawScore1() {
    ctx.font = "30px 'Press Start 2P', cursive";
    ctx.fillStyle = "red";
    ctx.fillText("Score player 1: "+score1, 38, 50);
}

function drawScore2() {
  ctx.font = "30px 'Press Start 2P', cursive";
  ctx.fillStyle = "red";
  ctx.fillText("Score player 2: "+score2, 1300, 50);
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
          var index = bombas.indexOf(bomba)
          bombas.splice(index,1)
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
        })
    }

    function drawBoss(){
      
          boss.draw()
    
  }

function checkZombiesCollitions(){
        zombies.forEach(function(zombie){
            if(zombie.checkCollition(chipHasard)){
                var index = zombies.indexOf(zombie)
                zombies.splice(index,1)
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
                  zombie.music.play()
                  score2 ++
                  if(score2 > 5 ) {
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

    function balasAndBadBoss2(){
      gorgonita.balas2.forEach(function(bala2, bI){
              if(boss.checkCollition(bala2)){
                  gorgonita.balas2.splice(bI,1)
                  score2 ++
              }
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
              }
          })
      })
  }


    function checkCuervosCollitions2(){
      cuervos.forEach(function(cuervo){
          if(cuervo.checkCollition(gorgonita)){
              var index = cuervos.indexOf(cuervo)
              cuervos.splice(index,1)
          }
      })
  }


    function checkBombasCollitions2(){
      bombas.forEach(function(bomba){
          if(bomba.checkCollition(gorgonita)){
              var index = bombas.indexOf(bomba)
              bombas.splice(index,1)
          }
      })
    }


    function checkZombiesCollitions2(){
      zombies.forEach(function(zombie){
          if(zombie.checkCollition(gorgonita)){
              var index = zombies.indexOf(zombie)
              zombies.splice(index,1)
          }
      })
  }

    function drawBalas2(){
      gorgonita.balas2.forEach(function(bala2){
          bala2.draw()
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
        var y = Math.floor(Math.random() * 350) + 80;
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
    chipHasard.balas.push(new Balas(chipHasard.x+100,chipHasard.y+45))
  } 
  if(e.keyCode === 38 && chipHasard.y > 350){
    chipHasard.y -= 400
  }
  if(e.keyCode == 39){
    chipHasard.x+=39
  }
  if(e.keyCode == 37){
    chipHasard.x-=15
  }
  if(e.key == 'Enter'){
    start()
    fondo.music.play()
  }
})


addEventListener('keydown',function(e){
  if(e.keyCode === 16){
    gorgonita.balas2.push(new Balas2(gorgonita.x+100,gorgonita.y+45))
  } 
  if(e.keyCode === 87 && gorgonita.y > 350){
    gorgonita.y -= 400
  }
  if(e.keyCode == 68){
    gorgonita.x+=39
  }
  if(e.keyCode == 65){
    gorgonita.x-=15
  }
})


















  // zelda muerte http://66.90.93.122/ost/the-legend-of-zelda-nes/ssgnhwrp/10%20Ending.mp3

  // zedla comienzo: http://66.90.93.122/ost/legend-of-zelda-the-a-link-to-the-past-gb/gfepgvfs/02%20Beginning%20of%20the%20Journey.mp3

  // zelda enemy http://66.90.93.122/ost/legend-of-zelda-the-a-link-to-the-past-gb/cznvhyve/26%20Release%20of%20Ganon.mp3

  // zombie "http://soundbible.com/mp3/Mummy Zombie-SoundBible.com-1966938763.mp3"
  