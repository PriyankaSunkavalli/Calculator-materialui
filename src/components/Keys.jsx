import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import React, { useReducer } from 'react';

const Root=styled.div`
width: 400px;
background-color: #758fa7;
border-radius: 10px;
display: flex;
align-items: center;
justify-content: center;
padding: 30px;
button{

    width: 100%;

}
    
`

const OutputScreen=styled.div`
    height: 100px;
    width: 400px;
background-color: #758fa7;
margin-bottom: 20px;
border-radius: 10px;
    
`

const CardContainer=styled.div``

const initialState={
  previousValue:'',
  currentValue:'',
  operator:'',
  result:''
}

const getResult=(current,prev,value)=>{
  let a=Number(current)
  let b=Number(prev)

  if(value==='+'){
    return a+b
  }
  else if(value==='-'){
    return a-b
  }
  else if(value==='/'){
    return a/b
  }
  else if(value==='*'){
    return a*b
  }

}

const reducer=(state,action)=>{
  switch(action.type){
    case 'AddDigit':
      if(!state.currentValue && action.payload==='.'){
        return{...state}
      }
      else if(state.currentValue && action.payload==='.' && state.currentValue.includes('.')){
        return{...state}
      }
      else if(state.currentValue && action.payload==='0' && state.currentValue[0]==='0'){
        return{...state}
      }
      return {...state, currentValue:state.currentValue+action.payload}
  case 'SetOperator':
    return {...state, previousValue:state.currentValue, currentValue:'',operator:action.payload}
    case 'Reset':
      return {...state,previousValue:'',currentValue:'',operator:'',result:''}
      case 'Result':
        if(state.previousValue && state.operator && state.currentValue){
          return{...state, result:getResult(state.currentValue,state.previousValue,state.operator)}
        }
      case 'Delete':
        if(state.previousValue && !state.currentValue){
          return{...state, operator:'' ,currentValue:state.previousValue, previousValue:''}
        }
        else{
          return{...state, currentValue:state.currentValue.slice(0,state.currentValue.length-1)}
        }
        default:
          return state

  }

}

const Keys = () => {
  const [state,dispatch]=useReducer(reducer,initialState)
  console.log(state)

  const addDigit=(digit)=>{
    console.log(digit)
    dispatch({
      type:'AddDigit',
      payload:digit
    })
  }

  const setOperator=(operator)=>{
    dispatch({
      type:'SetOperator',
      payload:operator
    })

  }

  const reset=()=>{
    dispatch({
      type:'Reset'
    })
  }

  const result=()=>{
    dispatch({
      type:'Result'
    })
  }

  const deleteVal=()=>{
    dispatch({
      type:'Delete'
    })
  }

  return (
    <CardContainer>
        <OutputScreen>
          {state.previousValue}
          {state.operator}
{state.currentValue}
{state.result && '='}
{state.result}
</OutputScreen>
        <Root>
        
        <Grid container spacing={2}>
            <Grid item lg={3}><Button variant='contained' onClick={()=>{addDigit('7')}}>7</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('8')}}>8</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('8')}}>9</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{deleteVal('')}} color='success'>DEL</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('4')}}>4</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('5')}}>5</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('6')}}>6</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{setOperator('+')}}>+</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('1')}}>1</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('2')}}>2</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('3')}}>3</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{setOperator('-')}}>-</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('.')}}>.</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{addDigit('0')}}>0</Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{setOperator('/')}}> / </Button></Grid>
            <Grid item lg={3}><Button  variant='contained' onClick={()=>{setOperator('*')}}>*</Button></Grid>
            <Grid item lg={6}><Button  variant='contained' onClick={()=>{reset()}} color='warning' >Reset</Button></Grid>
            <Grid item lg={6}><Button  variant='contained' onClick={()=>{result()}} color='error'>=</Button></Grid>



        </Grid>
      
    </Root>
    </CardContainer>
  );
}

export default Keys;
