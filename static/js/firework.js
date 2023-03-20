// 定义变量
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
var particles = []
var W
var H
var button = document.getElementById("firework-button")
var timerId
var canvasVisible = false

// 添加 canvas
document.body.appendChild(canvas)

// 初始化
function init () {
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W
    canvas.height = H
}

// 创建粒子
function createParticles (x, y) {
    // 创建一个粒子
    for (var i = 0; i < 30; i++) {
        particles.push(new Particle(x, y))
    }
}

// 粒子构造函数
function Particle (x, y) {
    this.x = x
    this.y = y
    this.vx = Math.random() * 10 - 5
    this.vy = Math.random() * 10 - 5
    this.color = "hsla(" + parseInt(Math.random() * 360, 10) + ", 100%, 50%, 1)"
}

// 更新粒子
Particle.prototype.update = function () {
    this.x += this.vx
    this.y += this.vy
    this.vy += 0.1
}

// 绘制粒子
Particle.prototype.draw = function () {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, false)
    ctx.fill()
}

// 烟花爆炸效果
function explode () {
    var x = Math.random() * W
    var y = Math.random() * H
    createParticles(x, y)
}

// 动画循环
function loop () {
    // 清空画布
    ctx.clearRect(0, 0, W, H)

    // 绘制粒子
    for (var i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
    }

    // 发射烟花
    if (Math.random() < 0.1) {
        explode()
    }
}

// 开始动画循环
function startAnimation () {
    timerId = setInterval(loop, 1000 / 60)
}

// 停止动画循环
function stopAnimation () {
    clearInterval(timerId)
}

// 删除画布
function deleteCanvas () {
    canvas.parentNode.removeChild(canvas)
    canvasVisible = false
}

// 点击按钮放烟花
button.addEventListener("click", function () {
    // 如果画布已被删除，则重新创建画布
    if (!canvasVisible) {
        document.body.appendChild(canvas)
        canvasVisible = true
        init()
    }
    // 放烟花并开始动画循环
    explode()
    startAnimation()
    // 5秒后停止动画循环并删除画布
    setTimeout(function () {
        stopAnimation()
        deleteCanvas()
        document.getElementById("text").style.display = "none"
    }, 5000)
})

// 初始化
init()
