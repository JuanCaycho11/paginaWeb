function numbers (e) {
    let key = e.charCode || e.which
    if (!(key >= 48 && key <= 57)) {
      e.preventDefault()
      e.returnValue = false
    }
  }
  function letters (e) {
    let key = e.charCode || e.which
    if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key === 13 || key === 32)) {
      e.preventDefault()
      e.returnValue = false
    }
  }
  
  function numberDecimal (e) {
    let key = e.charCode || e.which
    if (!((key >= 48 && key <= 57) || key === 46)) {
      e.preventDefault()
      e.returnValue = false
    }
  }
  export default {
    numbers,
    letters,
    numberDecimal
  }