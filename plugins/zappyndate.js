function getNomDayWeek (f, U = false, L = false, S = false) {
    let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    let res = dias[f.getDay()]
    if (U) res = res.toUpperCase()
    if (L) res = res.toLowerCase()
    if (S) res = res.substring(0, 3) + '.'
    return res
  }
  function getNomMonth (f, U = false, L = false, short = false) {
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let res = meses[f.getMonth()]
    if (U) res = res.toUpperCase()
    if (L) res = res.toLowerCase()
    if (short) res = res.substring(0, 3)
    return res
  }
  
  function getHourLar (f) {
    return ('0' + f.getHours()).slice(-2) + ':' + ('0' + f.getMinutes()).slice(-2)
  }
  
  module.exports = {
    getNomDayWeek,
    getNomMonth,
    getHourLar
  }