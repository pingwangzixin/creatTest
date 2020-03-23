import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { wordRelevant } from "@/api";
export default new Vuex.Store({
    state:{
        arr:[]
    },
    mutations:{
        addObj(state,obj){
        	console.log(8888888)
        	console.log(obj)
            state.arr.push(obj)
        },
        deleteObj(state,obj){
            state.arr.forEach((ele,index)=>{
                if(obj.id == ele.id){
                    state.arr.splice(index,1);
                }
            })
        },
        viewExerciseBar(state,arr){
        	console.log(arr)
            state.arr  = arr;
        }
    },
    actions:{
        // 查看习题栏
        requestViewTitle(context,paylaod){
        	console.log(9999999999)
        	console.log(context)
        	console.log(paylaod)
    		wordRelevant.exerciseBarView({
    		    userId:1,
    		    subjectId : paylaod.subjectId,
    		    levelId : paylaod.levelId
//  		    subjectId : "subject_2_2",
//  		    levelId : "level_2"
    		}).then(res=>{
    			console.log(res.data.data)
    		    context.commit("viewExerciseBar",res.data.data);
    		})
        },
        requestAddObj(context,paylaod){
        	console.log(777777777)
        	console.log(context)
        	console.log(paylaod)
            wordRelevant.addDeleteExerciseBar(paylaod).then(res=>{
                context.dispatch("requestViewTitle",{levelId:paylaod.levelId,subjectId:paylaod.subjectId});
            })
        },
        abc (context){
        	console.log(context);
        	console.log('hahaha')
        }
    }
});