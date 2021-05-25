import { useState } from "react"

export const reducer = (state, action) => {

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }

  if (action.type === 'REMOVE_ITEM') {
    let newItems = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: newItems }
  }

  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 }
      }
      return cartItem
    });
    return { ...state, cart: tempCart }
  }

  if (action.type === 'DECREASE') {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        if (cartItem.amount !== 1)
          return { ...cartItem, amount: cartItem.amount - 1 }
      }
      return cartItem
      //filter would select items that was different with 0 (if you want to see result please removing the "if(cartItem,id === action.payload)"" statement)
    }).filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart }
  }
  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      //cartTotal = {total: 0, amount :0}
      //if you pass initial value of {total,amount} = {total: 20, amount: 20}
      //so cartItemt = {total: 20, amount: 20}
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem
        cartTotal.amount += amount
        cartTotal.total += price * amount
        return cartTotal
      },
      {
        total: 0,
        amount: 0
      })
    total = parseFloat(total.toFixed(2))

    return { ...state, total, amount }
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true }
  }
  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state, cart: [...state.cart, ...action.payload], loading: false
    }
  }
  return state;
}
