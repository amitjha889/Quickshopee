var initializedproduct={

product:{



},
user:{




}


}

export default function Storage(state=initializedproduct,action){

   switch(action.type)
   {
     case 'Add_Product':
        state.product[action.payload[0]]=action.payload[1]
        return {product:state.product,user:state.user}

      case 'Update_Product':
         state.product[action.payload[0]]=action.payload[1]
         return {product:state.product,user:state.user}

     case 'Delete_product':   
        delete state.product[action.payload[0]]
        return {product:state.product,user:state.user}

     case 'Add_User':
      state.user=action.payload[0]
      console.log('Userrrrr',state.user)
      return{product:state.product,user:state.user}

     case 'Clear_Product':
       state.product={}
      return{product:state.product,user:state.user}

      
        
        default:
        return {product:state.product,user:state.user}
    
   }






}