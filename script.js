const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

let maxSize
const adjustHeight = () => {
  if (window.innerHeight < window.innerWidth) {
    maxSize = window.innerHeight * 0.9
  } else {
    maxSize = window.innerWidth * 0.9
  }

  canvas.width = maxSize
  canvas.height = maxSize
}

adjustHeight()
canvas.className = 'center-canvas'

/* AUTOGENERATIVE ART FUNCTIONS */

const tangledColrdLines = () => {
  const drawRandLine = (startPos) => {
    let endPos = {
      x: Math.floor(Math.random() * maxSize),
      y: Math.floor(Math.random() * maxSize)
    }

    ctx.lineWidth = Math.floor(Math.random() * 6)
    ctx.strokeStyle = 'rgb(' + 
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ')'

    ctx.beginPath()
    ctx.moveTo(startPos.x, startPos.y)
    ctx.lineTo(endPos.x, endPos.y)
    ctx.stroke()

    return endPos
  }

  let startPos = {
    x: Math.floor(Math.random() * maxSize),
    y: Math.floor(Math.random() * maxSize)
  }
  const numOfLines = 220

  for (let n = 0; n < numOfLines; n++) {
    startPos = drawRandLine(startPos)
  }
}

const squareCollage = () => {
  const drawRandSquare = () => {
    let pos = {
      x: Math.floor(Math.random() * maxSize),
      y: Math.floor(Math.random() * maxSize)
    }
    let size = Math.floor(Math.random() * 100)
    let borderWidth = Math.floor(Math.random() * 10)

    ctx.fillStyle = 'rgb(' + 
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ')'
    ctx.strokeStyle = 'rgb(' + 
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ')'
    
    ctx.lineWidth = borderWidth
    ctx.fillRect(pos.x - size / 2, pos.y - size / 2, size, size)
    ctx.strokeRect(pos.x - size / 2, pos.y - size / 2, size, size)
  }

  const numOfSquares = 200
  for (let n = 0; n < numOfSquares; n++) {
    drawRandSquare()
  }
}

const doubleDerivWorm = () => {
  /*
  This uses the Calculus concept of double derivatives.

  Essentially, the rate of change is positive, but it is
  also decreasing (the rate of change of the rate of
  change is negative)
  */

  /* In Calculus Terms:
  let s(t) be the circle size throughout the course of the
  spiral (t = 0 being the start of the spiral)

  s'(t) > 0 at t = 0
  s"(t) < 0 and is a constant value
  */

  /* The interesting thing is, once the size gets down to zero,
  it generates a new s'(t) random positive starting value, making
  each little knob a different size and shape */

  const drawCircle = (stat, t) => {
    ctx.beginPath()
    ctx.arc(maxSize / 2, t * 10, stats.size, 0, 2 * Math.PI)
    ctx.fill()
    //ctx.stroke() // uncomment this for a more detailed, eccentric look

    if (stats.size + stats.sizePrime < 0) {
      stats.sizePrime = Math.floor(Math.random() * 20) + 10

    let color = {
      red: Math.floor(Math.random() * 255),
      green: Math.floor(Math.random() * 255),
      blue: Math.floor(Math.random() * 255)
    }

    ctx.fillStyle = 'rgb(' + 
      color.red + ', ' +
      color.green + ', ' +
      color.blue + ')'
    ctx.strokeStyle = 'rgb(' + 
      (255 - color.red) + ', ' +
      (255 - color.green) + ', ' +
      (255 - color.blue) + ')'
    }
    stats.size += stats.sizePrime
    stats.sizePrime += stats.sizeDoublePrime

    return stats
  }

  const numOfCircles = Math.ceil(maxSize / 10)
  let stats = {
    size: Math.floor(Math.random() * 10),
    sizePrime: Math.floor(Math.random() * 20) + 10,
    sizeDoublePrime: -Math.floor(Math.random() * 10) - 5,
  }

  let color = {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  }

  ctx.fillStyle = 'rgb(' + 
    color.red + ', ' +
    color.green + ', ' +
    color.blue + ')'
  ctx.strokeStyle = 'rgb(' + 
    (255 - color.red) + ', ' +
    (255 - color.green) + ', ' +
    (255 - color.blue) + ')'
  ctx.lineWidth = 5

  for (let t = 0; t < numOfCircles; t++) {
    stats = drawCircle(stats, t)
  }
}

const squareSpiral = () => {
  const drawSquare = (stats) => {
    /* This uses trigonometry (pythagorean theorem) to
    calculate the change in x and y needed to move
    a certain distance in a certain direction theta */

    /*
    It also uses Calculus for the spiral shape. The double
    derivative of theta is positive (if it where 0, this would
    simply be a circle)
    */

    stats.theta += stats.thetaPrime
    stats.thetaPrime += stats.thetaDoublePrime
    stats.distIncr -= 17.3 / maxSize

    let xDif = Math.sin(stats.theta) * stats.distIncr
    let yDif = Math.cos(stats.theta) * stats.distIncr

    stats.x += xDif
    stats.y += yDif

    stats.size -= 80 / maxSize

    ctx.strokeStyle = 'rgb(' + 
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ', ' +
      Math.floor(Math.random() * 255) + ')'

    ctx.strokeRect(stats.x, stats.y, stats.size, stats.size)

    return stats
  }

  let stats = {
    theta: 0,
    thetaPrime: (6.92 / maxSize) * Math.PI,
    thetaDoublePrime: (0.0346 / maxSize) * Math.PI,
    distIncr: maxSize / 34.6,
    x: 30,
    y: maxSize / 2 - 40,
    size: maxSize / 8.65
  }
  let numOfSquares = maxSize / 1.73
  ctx.lineWidth = 3

  for (let n = 0; n < numOfSquares; n++) {
    stats = drawSquare(stats)
  }
}

const main = () => {
  ctx.clearRect(0, 0, maxSize, maxSize)
  squareCollage() // change this function here
}
main()

window.onresize = () => {
  adjustHeight()
  main()
}

canvas.onclick = (event) => {
  event.preventDefault()
  main()
}