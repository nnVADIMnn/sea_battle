import {useState} from 'react'
import './App.css'


function place_ships(board){
  let test_field = [
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null]
  ]
  console.log(test_field)
  for(let i = 4; i > 0; i--){
    for(let j = 5 - i; j > 0; j--){
      let point_x = Math.floor((Math.random() * 10))
      let point_y = Math.floor((Math.random() * 10))
      let dir = Math.floor((Math.random() * 10 % 2))
      //console.log(i, point_y, point_x, dir)
      if(dir){
        if(point_x + i > 10){
          j++
        }
        else{
          for(let k = point_x; k < point_x + i; k++){
            test_field[point_y][k] = "*"
          }
        }
      }
      else{
        if(point_y + i > 10){
          j++
        }
        else{
          for(let k = point_y; k < point_y + i; k++){
            test_field[k][point_x] = "*"
          }
        }
      }
    }
  }
  console.log(test_field)
  return test_field
}

function Replace_button({value, onPlace}){
  return(
    <button
    className='replace'
    onClick={onPlace}
    >
      {value}
    </button>
  )
}

function Cell({value}){
  const status = {"*":"cell player_ship"}
  return(
    <button
    className = {"cell " + status[value]}
    >
    </button>
  )
}

function Row({cells}){
  const cells_objs = cells.map((cell, index) =>{
    return (<Cell key = {index} value = {cells[index]}/>)
  })
  return(
    <div
    className='row'
    >
    {cells_objs}
    </div>
  )
}

function Board({rows}){
  const rows_objs = rows.map((row, index) =>{
    return (<Row key = {index} cells = {rows[index]}/>)
  })
  return(
    <div
    className='board'
    >
    {rows_objs}
    </div>
  )
}

function Table({boards}){
  return(
    <div
    className='table'
    >
      <Board rows = {boards[0]}/>
      <Board rows = {boards[1]}/>
    </div>
  )
}

export default function Game(){
  const [placed, setPlaced] = useState("Place ships")
  const [score, setScore] = useState([0, 0])
  const [fields, setFields] = useState(Array(2).fill(Array(10).fill(Array(10).fill(null))))
  {console.log(fields)}
  function handlePlace(){
    setFields([place_ships(0), Array(10).fill(Array(10).fill(null))])
    setPlaced("Replace ships")
  }
  return(
    <>
    <Table boards = {fields}/>
    <Replace_button value = {placed} onPlace = {handlePlace}/>
    </>
  )
}