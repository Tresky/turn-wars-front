import cloneDeep from 'lodash/cloneDeep'
import filter from 'lodash/filter'
import map from 'lodash/map'
import maxBy from 'lodash/maxBy'
import sortBy from 'lodash/sortBy'
import sortedIndexBy from 'lodash/sortedIndexBy'

// TODO: Include Buildings in this store as well: Change UnitStore -> ArmyStore

function sortUnitsByCoordinates (arr) {
  return arr.sort((unitA, unitB) => unitA.coordinate.x - unitB.coordinate.x || unitA.coordinate.y - unitB.coordinate.y);
}

function processArmy (army) {
  return {
    units: sortUnitsByCoordinates(army.units)
  }
}

function combineArmies (allArmies) {
  let armies = map(allArmies, army => army.units)

  // Helper function that will push the first element from an array into the
  // destination array. If the source array is empty, don't do anything.
  function addFromArray (destination, arrayIndex) {
    if (armies[arrayIndex].length === 0)
      return

    destination.push({
      armyIndex: arrayIndex,
      obj: cloneDeep(armies[arrayIndex].shift())
    })
  }


  // Seed the firstElements array. This array contains the first element
  // of each of the arrays being combined.
  let firstElements = []
  for (let i = 0; i < armies.length; i++) {
    addFromArray(firstElements, i)
  }

  // Go through all arrays and add each element from the armies in sorted order.
  let results = []
  while (true) {
    firstElements = firstElements.sort((unitA, unitB) => unitA.obj.coordinate.x - unitB.obj.coordinate.x || unitA.obj.coordinate.y - unitB.obj.coordinate.y);

    let smallest = firstElements.shift()
    results.push(smallest.obj)

    // Pull another element from the array we just pulled from.
    addFromArray(firstElements, smallest.armyIndex)

    // Once there is nothing else to add, break the loop.
    if (firstElements.length === 0)
      break
  }

  return results
}

class UnitStore {
  constructor () {
    this.unit = undefined
    this.armies = undefined
  }

  processArmies (armies) {
    this.armies = {}

    // Process each army individually.
    for (let i = 0; i < armies.length; i++) {
      this.armies[armies[i].name] = processArmy(armies[i])
    }

    // Add all units into a single array for easier searching.
    this.store = combineArmies(cloneDeep(this.armies))
    console.log(map(this.store, unit => unit.coordinate))
  }

  atLocation (x, y) {
    return filter(this.store, unit => unit.coordinate.x === x && unit.coordinate.y === y)
  }
}

export default UnitStore