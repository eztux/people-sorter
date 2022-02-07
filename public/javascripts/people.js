var isMouseDown = false

var selectedCells = []
var userSelectedCells = []
var previousSelectedCells = []
var startCell = null
var currentHoverCell = null
var currentColor = "white"


// function inverseIndices(indices, array){
//   console.log("Before sort")
//   console.log(indices)
//   indices.sort((a, b) => {
//     return a - b
//   })
//   console.log("After sort")
//   console.log(indices)

//   var inverseIndices = []
//   var count = 0

//   for(var i = 0; i < array.length; i++){
//     if(indices[count] != i)
//       inverseIndices.push(i)
//   }
//   // array.forEach((elem, index) => {
//   //   if(indices[count] != index){
//   //     inverseIndices.push(index)
//   //     count++
//   //   }
//   // })

//   return inverseIndices
// }

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function checkElemsDuplicates(elemsList){
  var retVal = []
  retVal = elemsList.filter((elemObj, index, self) => {
    return searchElems(elemObj, elemsList) === index
  })

  return retVal
}

// Checks for index in elemsList
/**
 * @name searchElems
 * @description Uses an elemObj to search through a list of element objects. Will return the index of where the object is found.
 * @param {obj} elemObj 
 * @param {[obj]} elemsList 
 * 
 * @returns {Number} index
 */
function searchElems(elemObj, elemsList){
  var retVal = -1

  elemsList.forEach((elem, index) => {
    if(elem.row == elemObj.row && elem.col == elemObj.col){
      retVal = index
    }
  })

  return retVal
}

function getElemsInArea(startElem, endElem){
  var rowDiff = startElem.row - endElem.row
  var colDiff = startElem.col - endElem.col

  console.log(`rowDiff: ${rowDiff}`)
  console.log(`colDiff: ${colDiff}`)

  var tempStart = {
    row: startElem.row,
    col: startElem.col
  }
  var tempEnd = {
    row: endElem.row,
    col: endElem.col  
  }

  if(rowDiff > 0){
    tempStart.row = endElem.row
    tempEnd.row = startElem.row
  }
  if(colDiff > 0){
    tempStart.col = endElem.col
    tempEnd.col = startElem.col
  }

  var elemsInArea = []

  for(var i = tempStart.row; i <= tempEnd.row; i++){
    for(var j = tempStart.col; j <= tempEnd.col; j++){
      //console.log(`${i}, ${j}`)
      elemsInArea.push({
        elem: document.querySelectorAll(`.Slot_${i}_${j}`)[0],
        row: i,
        col: j
      })
    }
  }
    
  return elemsInArea
}

function onMouseDown(row, col){
  // Find the element
  var elem = document.querySelectorAll(`.Slot_${row}_${col}`)[0]
  var elemObj = {
    elem: elem, 
    row: row, 
    col: col
  }
  isMouseDown = true
  
  if(elem){
    console.log("Found elem")

    var index = searchElems(elemObj, selectedCells)
    startCell = elemObj

    // If the element is not in the selected cells, add it and make it green
    if(index == -1){
      currentColor = "green"
      elem.style.background = currentColor
    }
    else{
      currentColor = "white"
      elem.style.background = currentColor
    }
  }
}

function onMouseOver(row, col){
  // Make sure mouse is down when this function activates
  if(isMouseDown == false)
    return

  // TODO: Add functionality when mouse is not down. Maybe...

  // Recolor the cells that were unselected in the new drag
  previousSelectedCells.forEach(elemObj => {
    console.log("Running through previously highlighted cells...")
    console.log(elemObj)

    elemObj.elem.style.background = "white"
  })

  // Re-add the cells that are selected
  selectedCells.forEach(elemObj => {
    console.log("Running through previously confirmed cells...")
    console.log(elemObj)

    elemObj.elem.style.background = "green"
  })

  // Reset the current selection of cells to the first place the user clicked
  userSelectedCells = [startCell]
  
  var elem = document.querySelectorAll(`#Slot_${row}_${col}`)[0]
  var elemObj = {
    element: elem, 
    row: row, 
    col: col
  }

  userSelectedCells = getElemsInArea(startCell, elemObj)

  userSelectedCells.forEach(cell => {
    cell.elem.style.background = currentColor
  })

  var indices = []
  previousSelectedCells.forEach((elemObj) => {
    var index = searchElems(elemObj, userSelectedCells)
    if(index > -1){
      indices.push(index)
    } 
  })

  previousSelectedCells = userSelectedCells
}

function onMouseUp(row, col){
  isMouseDown = false

  if(row == startCell.row && col == startCell.col){
    if(currentColor == "green")
      selectedCells.push(startCell)
    else{
      var index = searchElems(startCell, selectedCells)
      selectedCells.splice(index, 1)
    }
    return
  }

  if(currentColor == "green")
    selectedCells = selectedCells.concat(userSelectedCells)
  
  // TODO: Get rid of cells from selectedCells when the current color is white
  if(currentColor == "white"){
    userSelectedCells.forEach((elemObj) => {
      var i = searchElems(elemObj, selectedCells)

      if(i > -1)
        selectedCells.splice(i, 1)
    })
  }
  userSelectedCells = []
  console.log("Mouse UP!")

  selectedCells = checkElemsDuplicates(selectedCells)

  selectedCells.sort((a, b) => {
    if(a.row == b.row)
      return a.col - b.col
    return a.row - b.row
  })
}






