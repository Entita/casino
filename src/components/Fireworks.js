const animFrame = ( function() {
	return typeof window !== "undefined" && (window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout( callback, 1000 / 60 );
				}
)})()

function random( min, max ) {
  return Math.random() * ( max - min ) + min;
}

export class FireworksClass {
  canvas
  ctx
  cw
  ch
	particlesPerTick
  particles = []
  hue = 55
  timerTotal = 10
  timerTick = 0
  frame = null

  constructor( canvas, numberOfStars ) {
		this.particlesPerTick = numberOfStars
    this.canvas = canvas
    this.cw = window.innerWidth
    this.ch = window.innerHeight
    this.canvas.width = this.cw
    this.canvas.height = this.ch
    this.ctx = canvas.getContext('2d')
    this.loop = this.loop.bind(this)
    this.start()
  }

  changeSize(canvas) {
    this.cw = window.innerWidth
    this.ch = window.innerHeight
    canvas.width = this.cw
    canvas.height = this.ch
  }

  createParticles( x, y ) {
    var particleCount = this.particlesPerTick;
    while( particleCount-- ) {
      this.particles.push( new Particle( x, y, this.hue ) );
    }
  }

  start() {
    setTimeout(() => {
      this.loop()
    }, 2750)
  }

  loop() {
    this.frame = animFrame(this.loop)

    this.hue= random(45, 65 );

    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    this.ctx.fillRect( 0, 0, this.cw, this.ch );
    this.ctx.globalCompositeOperation = 'lighter';

    var i = this.particles.length;
    while( i-- ) {
      this.particles[ i ].draw( this.ctx, this.hue );
      this.particles[ i ].update( i, this.particles );
    }

    if( this.timerTick >= this.timerTotal ) {
			this.createParticles( this.cw / 2, this.ch / 2 )
			this.timerTick = 0;
    } else {
      this.timerTick++;
    }
  }
}

function Particle( x, y, hue ) {
	this.x = x;
	this.y = y;
	// track the past coordinates of each particle to create a trail effect, increase the coordinate count to create more prominent trails
	this.coordinates = [];
	this.coordinateCount = 5;
	while( this.coordinateCount-- ) {
		this.coordinates.push( [ this.x, this.y ] );
	}
	// set a random angle in all possible directions, in radians
	this.angle = random( 0, Math.PI * 2 );
	this.speed = random( 3, 10 );
	// friction will slow the particle down
	this.friction = 1;
	// gravity will be applied and pull the particle down
	this.gravity = 0;
	// set the hue to a random number +-50 of the overall hue variable
	this.hue = random( hue - 10, hue + 10 );
	this.brightness = random( 50, 80 );
	this.alpha = 1;
	// set how fast the particle fades out
	this.decay = random( 0.00015, 0.0003 );
}

Particle.prototype.update = function( index, particles ) {
	this.coordinates.pop();
	this.coordinates.unshift( [ this.x, this.y ] );
	this.speed *= this.friction;
	this.x += Math.cos( this.angle ) * this.speed;
	this.y += Math.sin( this.angle ) * this.speed + this.gravity;
	this.alpha -= this.decay;

	if( this.alpha <= this.decay ) particles.splice( index, 1 )
}

Particle.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.moveTo( this.coordinates[ this.coordinates.length - 1 ][ 0 ], this.coordinates[ this.coordinates.length - 1 ][ 1 ] );
	ctx.lineTo( this.x, this.y );
	ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
	ctx.stroke();
}
