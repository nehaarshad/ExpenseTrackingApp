import { StyleSheet, Text, View ,ActivityIndicator,ScrollView} from 'react-native'
import {use, useEffect,useState} from 'react'
import axios, { spread } from 'axios'
import { useAuth } from '../../hooks/useAuth'
import { apiUrl } from '../../constants/apiUrl'
import  FindUser from '../../utils/getUser'
import CardView from '../../components/homeViewCard'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HeaderImage from '../../components/shared/headerImage'
import { radius, spacingX, spacingY } from '../../constants/scaling'
import { appColors } from '../../constants/colors'
import { verticalScale } from '../../utils/scalingUtils'
import { useExpense } from '../../hooks/useExpenses'


//getUserApi
//getUser transaction for tile
//get userCard price Api
const HomeView = ({}) => {
  const {user}=useAuth();

   const { 
    totalAmount, 
    totalIncome, 
    totalExpense, 
    userTransactions, 
    loading 
  } = useExpense();
    
  return (
    <View style={{flex:1,backgroundColor:appColors.white}}>
      <HeaderImage view={false} text='Welcome Back,' username={user.displayName} ></HeaderImage>

      {/* Card */}
        <CardView total={totalAmount} in={totalIncome} ex={totalExpense}></CardView>

   {/* Transaction */}
        <View style={styles.transactionSection}>
              {/* heading */}
      <View style={styles.tile}>
        <Text style={styles.title}>Transactions History</Text>
        <Text style={styles.end}>See All</Text>
      </View>

       {/* transaction */}
             {loading ? (
             <ActivityIndicator size="large" color={appColors.baseGreen} />
         ): userTransactions.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {userTransactions.map((trans, index) => (
            <View key={index} style={styles.card}>

              <View style={styles.cardMain}>

                   <View style={styles.left}>
                      <MaterialCommunityIcons name={trans.icon} size={spacingY._30} color={appColors.lightBaseGreen}/>   
                      <View style={styles.mainTag}>
                        <Text style={styles.Title}>{trans.title}</Text>
                        <Text style={styles.desc}>{trans.description}</Text>
                       </View>
                   </View>

                   {
                        trans.type==='Income' ?(
                            <Text style={[styles.amount, { color: appColors.baseGreen }]}>+ Rs.{trans.amount}</Text>

                        ):(
                              <Text style={[styles.amount, { color: appColors.red }]}>- Rs.{trans.amount}</Text>

                        )
                       }

              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noDataText}>No Transactions Yet</Text>
      )}
        </View>
    </View>
 
  )
}

export default HomeView

const styles = StyleSheet.create({

transactionSection: {
  marginTop: verticalScale(-70),
  flex: 5,
},

  tile: {
    marginHorizontal:spacingX._20,
    flexDirection:'row',
    alignContent:'center',
    justifyContent:'space-between',
    marginBottom:spacingY._10
  },
  title:{
    fontSize:spacingY._18,
    fontWeight:'800'
  },
  end:{
    color:appColors.neutral600,
    fontSize:spacingY._15
  },
   scrollView: {
    maxHeight: '75%'
  },
  card:{
    backgroundColor:appColors.white,
    marginHorizontal:spacingX._20,
    marginVertical:spacingY._7,
    borderColor:appColors.offWhite,
    borderCurve:'continuous',
    borderRadius:radius._15,
    height:spacingY._55,
    paddingHorizontal:spacingX._15,
    paddingVertical:spacingY._7

  },
    noDataText: {
    textAlign: 'center',
    marginTop: spacingY._100,
    fontSize: spacingY._18,
    color: appColors.baseGreen,
  },
  cardMain:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  left:{
    flexDirection:'row'
  },
  mainTag:{
    marginLeft:spacingX._10
  },
  Title:{
    color:appColors.black,
    fontWeight:'bold',
    fontSize:spacingY._18
  },
  desc:{
    color:'grey',
    fontWeight:'400'
  },
  amount:{
    fontSize:spacingY._20
  }
 
})