import {useState} from 'react'
import './App.css'


function place_ships(board){
  let test_field = []
  for(let i = 0; i < 10; i++){
    test_field[i] = []
    for(let j = 0; j < 10; j++){
      test_field[i][j] = board
    }
  }
  for(let i = 4; i > 0; i--){
    for(let j = 5 - i; j > 0; j--){
      let point_x = Math.floor((Math.random() * 10))
      let point_y = Math.floor((Math.random() * 10))
      let dir = Math.floor((Math.random() * 10 % 2))
      if(dir){
        if(point_x + i > 10){
          j++
        }
        else{
          for(let k = point_x; k < point_x + i; k++){
            test_field[point_y][k] = board + 4
          }
        }
      }
      else{
        if(point_y + i > 10){
          j++
        }
        else{
          for(let k = point_y; k < point_y + i; k++){
            test_field[k][point_x] = board + 4
          }
        }
      }
    }
  }
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

function Cell({value, y, x, onCell}){
  function handleClick(){
    onCell(y, x, value)
  }
  return(
    <button
    className = {"cell " + value}
    onClick = {handleClick}
    >
    </button>
  )
}

function Row({cells, y, onCell, status}){
  const cells_objs = cells.map((cell, index) =>{
    return (<Cell key = {index} value = {status[cells[index]]} x = {index} y = {y} onCell = {onCell}/>)
  })
  return(
    <div
    className='row'
    >
    {cells_objs}
    </div>
  )
}

function Board({rows, onCell, status}){
  const rows_objs = rows.map((row, index) =>{
    return (<Row key = {index} cells = {rows[index]} y = {index} onCell = {onCell} status = {status}/>)
  })
  return(
    <div
    className='board'
    >
    {rows_objs}
    </div>
  )
}

function Table({boards, onCell}){
  const status = {
    0:"player_cell",
    1:"enemy",
    2:"miss",
    4:"player_ship",
    5:"enemy_ship",
    6:"damaged"
  }
  return(
    <div
    className='table'
    >
      <Board rows = {boards[0]} onCell = {function(){}} status = {status}/>
      <Board rows = {boards[1]} onCell = {onCell} status = {status}/>
    </div>
  )
}

export default function Game(){
  const [placed, setPlaced] = useState("Place ships")
  const [score, setScore] = useState([0, 0])
  const [fields, setFields] = useState(Array(2).fill(Array(10).fill(Array(10).fill(null))))
  {console.log(score)}
  function handlePlace(){
    if(placed == "Place ships")
      setFields([place_ships(0), place_ships(1)])
    else
      setFields([place_ships(0), fields[1].slice()])
    setPlaced("Replace ships")
  }
  function handleCell(y, x, type){
    if(type){
      let new_field = fields.slice()
      if(type == "enemy")
        new_field[1][y][x] = 2
      else if(type == "enemy_ship"){
        new_field[1][y][x] = 6
        let new_score = score.slice()
        new_score[0]++
        setScore([new_score[0]++, new_score[1]])
      }
      setFields(new_field)
    }
  }
  return(
    <>
    <Table boards = {fields} onCell = {handleCell}/>
    <Replace_button value = {placed} onPlace = {handlePlace}/>
    </>
  )
}