import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColors } from '../constants/colors'
import { verticalScale } from '../utils/scalingUtils'
import Ionicons from '@expo/vector-icons/Ionicons';
import { radius, spacingX, spacingY } from '../constants/scaling'

const CardView = (props) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.total}>Total Balance :</Text>
       <Text style={styles.Tamount}>Rs. {props.total}</Text>

       <View style={styles.componentContainer}>

  {/* Expense block */}
  <View>
            <View style={styles.expenseType}>
                 <View style={styles.circle}>
                    <Ionicons name="arrow-up" size={spacingY._15} color={appColors.baseGreen} />
                 </View>
            <Text style={styles.total}>Expense</Text>
           </View>
            <Text style={styles.amount}> 
            Rs. {props.ex}
           </Text>
  </View>
 
  {/* Income block */}
<View>
  <View style={styles.expenseType}>
    <View style={styles.circle}>
      <Ionicons name="arrow-down" size={spacingY._15} color={appColors.baseGreen} />
    </View>
    <Text style={styles.total}>Income</Text>
  </View>

       <Text style={styles.amount}>Rs. {props.in}</Text>
       </View>
       </View>

     

       </View>
        
  )
}

export default CardView

const styles = StyleSheet.create({
  cardContainer:{
     top:verticalScale(-90),
    backgroundColor:appColors.baseGreen,
    width:'90%',
    height:spacingY._160,    
    borderRadius:radius._17,
    alignSelf:'center',
    gap:spacingY._1,
    paddingHorizontal:spacingY._20,
    paddingVertical:spacingY._12,
  
  },
  total:{
    color:appColors.offWhite,
    fontSize:spacingY._15,
    fontWeight:'semibold',

  },
   circle: {
       backgroundColor:appColors.neutral600,
       borderRadius:radius._200,
       borderCurve:"continuous",
       justifyContent:'center',
       alignItems:'center',
       width:spacingX._25,
       height:spacingX._25,
      },
  expenseType:{
    flexDirection:'row',
    gap:spacingY._10,
  },
  amount:{
    
    color:appColors.offWhite,
    fontSize:spacingY._12,
    marginLeft:spacingX._35
  },
  componentContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  Tamount:{
    color:appColors.offWhite,
    fontSize:spacingY._35,
    fontWeight:'bold',
    marginBottom:spacingY._20,

  },
})