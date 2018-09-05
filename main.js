//canvas config
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')

//testing
//ctx.fillRect(0,0,50,50)


//Variables globales
var zombiess = []
var cuervos = []
var interval;
var frames = 0;
var disparosP = []
var images = {
  fondo:'https://art.pixilart.com/b1cba2e0287f955.png',
  comandante :'https://art.pixilart.com/f918c10aafbd1c5.png',
  piso: 'https://art.pixilart.com/b443ba4e271a644.png',
  pajaro: 'https://art.pixilart.com/f8ad179027578d7.png',
  zombie: 'https://art.pixilart.com/22d203f96b0d188.png',
  balas: 'https://art.pixilart.com/d4308951377cb66.png'
}

//clases
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
    this.music = new Audio()
    this.music.src = "http://66.90.93.122/ost/legend-of-zelda-the-majora-s-mask-3d-original-sound-track/dulyjzpw/216%20Ghost%20Attack.mp3"
  }
  draw(){
    this.x--
    if(this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height)

    //ctx.font = '50px Avenir'
    //ctx.fillText(Math.floor(frames / 60),100,100)
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
  }
  draw(){
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}//termina fondo

class Comandante{
  constructor(){
    this.x = 20
    this.y = 250
    this.width = 80
    this.height = 120
    this.image = new Image ()
    this.image.src = images.comandante
    this.image.onload = () =>{
      this.draw()
    }
    this.gravity = 4
    this.crash = new Audio()
    this.crash.src = "http://66.90.93.122/ost/the-legend-of-zelda-nes/ssgnhwrp/10%20Ending.mp3"
  }
  draw(){
  if(this.y < canvas.height - 260) this.y += this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  goRight(){
  this.x+=15   
  }
  goLeft(){
  this.x-=15
  }
  crashWidth(item){
    var crash = (this.x < item.x + item.width) &&
           (this.x + this.width > item.x) &&
           (this.y < item.y + item.height) &&
           (this.y + this.height > item.y);
           //if (crash) this.crash.play()
           return crash;
  }
}//termina comandante

class Balas{
  constructor(){
    this.x = comand.x+comand.width-10
    this.y = comand.y+(comand.height/2)-21
    this.width = 20
    this.height = 20
    this.image = new Image ()
    this.image.src = images.balas
    this.image.onload = () =>{
      this.draw()
    }
    //this. = new Audio()
    //this..src = ""
  }
  draw(){
    this.x+=5
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  mosterKill(item){
    var crash = (this.x < item.x + item.width) &&
           (this.x + this.width > item.x) &&
           (this.y < item.y + item.height) &&
           (this.y + this.height > item.y);
           //if (crash) this.crash.play()
           return crash;
  }
}

class Pajaros {
  constructor(y, height){ 
    this.x = canvas.width -50
    this.y = y ? y : 0 
    this.width = 50
    this.height = height || 100 // si no tines height usa 100
    this.image = new Image ()
    this.image.src = images.pajaro
    this.image.onload = () =>{
      this.draw()
    }
    this.music = new Audio()
    this.music.src = 'https://sonidosdeanimales.net/wp-content/uploads/2015/09/cuervo.mp3'
    }
    draw(){
      this.x-=2
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }

}

class Zombie {
  constructor(y, height){ //se ejecuta si no llega
    this.x = canvas.width -50
    this.y = y ? y : 0 //si se asigna y si no usa 0
    this.width = 90
    this.height = height || 100 // si no tines height usa 100
    this.image = new Image ()
    this.image.src = images.zombie
    this.image.onload = () =>{
      this.draw()
    }
    this.music = new Audio()
    this.music.src = "http://soundbible.com/mp3/Mummy Zombie-SoundBible.com-1966938763.mp3"
    }
    draw(){
      this.x-=.5
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}


//instancias
var foondo = new Fondo()
var pisoo = new Piso()
var comand = new Comandante()
var zombieee = new Zombie()
var cuervo = new Pajaros()
var balasas = new Balas()

//funciones principales
function update(){
  frames++
  ctx.clearRect(0,0,canvas.width,canvas.height)
  foondo.draw()
  pisoo.draw()
  comand.draw()
  //////////////////
  generatePajaros()
  drawPajaros()
  generateZombies()
  drawZombies()
  checkCollitions()
  drawBalas()
  killMonsters()
}

function start(){
  if(interval) return
 
  interval = setInterval(update,1000/60)
}

function gameOver(){
  clearInterval(interval)
  ctx.font = ('90px Avenir')
  ctx.fillText('Game Over', 50 ,250)
  interval=null
  comand.crash.play()
  pisoo.music.pause()

}

//funciones auxiliares
function generatePajaros(){
  if(frames % 250 === 0){
      var y = Math.floor(Math.random() * 400) + 20;
      var alto = 40;
      var cuervo = new Pajaros(y,alto, 'pajaro')
      cuervos.push(cuervo)
      cuervo.music.play()
  }
}

function drawPajaros(){
  cuervos.forEach(function(pajaro){
    pajaro.draw()
  })
}

function generateZombies(){
  if(frames % 150 === 0){
      var y = 260;
      var alto = 100;
      var zombies = new Zombie(y,alto, 'zombie')
      zombiess.push(zombies)
      zombieee.music.play()
  }
}

function drawZombies(){
  zombiess.forEach(function(zombie){
    zombie.draw()
  })
}

function killMonsters(){
  disparosP.forEach(function(zombie){
    if(balasas.mosterKill(zombie)){
    zombiess.splice(0,1);
  }
})
}

function checkCollitions(){
  zombiess.forEach(function(zombie){
    if(comand.crashWidth(zombie)){
      gameOver()
    }
  })
  cuervos.forEach(function(cuervo){
    if(comand.crashWidth(cuervo)){
      gameOver()
    }
  })

}

function generateBalas(){
  var balas = new Balas('balas')
  disparosP.push(balas)
}

function drawBalas(){
  disparosP.forEach(function(bala){
    bala.draw()
  })
}


//los observadores
  addEventListener('keydown',function(e){
    if(e.keyCode === 32 && comand.y > 30){
      comand.y -= 200
    }
    if(e.keyCode == 90){
      generateBalas(comand);
    }
    if(e.keyCode == 39){
      comand.goRight()
    }
    if(e.keyCode == 37){
      comand.goLeft()
    }
    if(e.key == 'Enter'){
      start()
     pisoo.music.play()
    }
  })





  // zelda muerte http://66.90.93.122/ost/the-legend-of-zelda-nes/ssgnhwrp/10%20Ending.mp3

  // zedla comienzo: http://66.90.93.122/ost/legend-of-zelda-the-a-link-to-the-past-gb/gfepgvfs/02%20Beginning%20of%20the%20Journey.mp3

  // zelda enemy http://66.90.93.122/ost/legend-of-zelda-the-a-link-to-the-past-gb/cznvhyve/26%20Release%20of%20Ganon.mp3

  // zombie "http://soundbible.com/mp3/Mummy Zombie-SoundBible.com-1966938763.mp3"