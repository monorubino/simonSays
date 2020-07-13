const lightBlue = document.getElementById('lightBlue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const LAST_LEVEL = 10

class Game 
{
  constructor()
  {
    this.beginGame()
    this.beginGame = this.beginGame.bind(this)
    this.newSequence()
    setTimeout(this.nextLevel, 500)
  }
  beginGame()
  {
    this.userClicks = this.userClicks.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.clickByUser = this.clickByUser.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      lightBlue,
      purple,
      orange,
      green
    }
  }
  toggleBtnStart()
  {
    if (btnStart.classList.contains('hide'))
    {
      btnStart.classList.remove('hide')
    }
    else
    {
      btnStart.classList.add('hide')
    }
  }
  newSequence()
  {
    this.sequence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }
  nextLevel()
  {
    this.subNivel = 0
    this.lightSequence()
    this.userClicks()
  }
  numberToColor(number)
  {
    switch (number)
    {
      case 0:
        return 'lightBlue'
      case 1:
        return 'purple'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }
  colorToLetter(color)
  {
    switch (color)
    {
      case 'lightBlue':
        return 0
      case 'purple':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }
  lightSequence ()
  {
    for (let i = 0; i < this.level; i++)
    {
      const color = this.numberToColor(this.sequence[i])
      setTimeout(() => this.lightingColor(color), 500*i)
    }
  }
  lightingColor(color)
  {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 400)
  }
  turnOffColor(color)
  {
    this.colors[color].classList.remove('light')
  }
  userClicks()
  {
    this.colors.lightBlue.addEventListener('click',this.clickByUser)
    this.colors.purple.addEventListener('click',this.clickByUser)
    this.colors.orange.addEventListener('click',this.clickByUser)
    this.colors.green.addEventListener('click',this.clickByUser)
  }
  deleteClicks()
  {
    this.colors.lightBlue.removeEventListener('click',this.clickByUser)
    this.colors.purple.removeEventListener('click',this.clickByUser)
    this.colors.orange.removeEventListener('click',this.clickByUser)
    this.colors.green.removeEventListener('click',this.clickByUser)
  }
  clickByUser(ev)
  {
    const nombreColor = ev.target.dataset.color
    const numberColor = this.colorToLetter(nombreColor)
    this.lightingColor(nombreColor)
    if (numberColor === this.sequence[this.subNivel])
    {
      this.subNivel++
      if (this.subNivel === this.level)
      {
        this.level++
        this.deleteClicks()
        if (this.level === (LAST_LEVEL + 1))
        {
          this.wonTheGame()
        }
        else
        {
          setTimeout(this.nextLevel, 1500)
        }
      }
    }
    else
    {
      this.lostTheGame()
    }
  }
  wonTheGame()
  {
    swal('FANTASTIC!','You won the Simon Says!','success')
      .then(this.beginGame)
  }
  lostTheGame()
  {
    swal('WRONG!','You lose =(','error')
      .then(() => {
        this.deleteClicks()
        this.beginGame()
      })
  }
}


function beginNewGame()
{
  window.newGame = new Game
} 
