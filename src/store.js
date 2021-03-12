import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)
const store = new Vuex.Store({
    plugins:[createPersistedState()],
    state:{
        con: [],
        shoppingCart:[],
        count:0,
    },
    getters:{
    },
    mutations:{
        setList(state,payload) {
            state.con = []
            state.con=state.con.concat(payload)
        },
        setCart(state,payload){
            if(payload){
                var index = state.shoppingCart.findIndex(item => item.title==payload.title)
                if(index==-1){
                    state.shoppingCart.unshift(payload) 
                } else{
                    if(payload.num!=0){
                        state.shoppingCart[index].num += payload.num
                        if(state.shoppingCart[index].num<=0){
                            state.shoppingCart.splice(index,1)
                        }
                    }else{
                        state.shoppingCart.splice(index,1)
                    }
                }
            }else{
                state.shoppingCart = []
            }
            state.count = 0
            state.shoppingCart.forEach(item=>{
                state.count += item.num
            })
            if(window.localStorage.username){
                var str = JSON.stringify(state.shoppingCart)
                axios.put('http://localhost:3000/shopInfo',{
                    tel: window.localStorage.username,
                    shopInfo: str
                }).then(()=>{ 
                }).catch(err=>{
                    console.log(err);
                })
            }
        },
        setShop(state,payload){
            payload = JSON.parse(payload)
            state.shoppingCart=state.shoppingCart.concat(payload)
            state.count = 0
            state.shoppingCart.forEach(item=>{
                state.count += item.num
            })
        }
    },
    actions:{
        getData({commit}) {
            axios.get('http://localhost:3000/show').then(res=> {
                commit('setList',res.data)
            }).catch(err=> {
                console.log(err)
            })
        }
    }
})


export default store;