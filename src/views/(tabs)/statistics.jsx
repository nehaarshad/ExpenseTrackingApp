import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView,StyleSheet,ActivityIndicator } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useExpense } from '../../hooks/useExpenses'
import { radius, spacingX, spacingY } from '../../constants/scaling';
import { appColors } from '../../constants/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#00aaff"
  }
};

const AnalyticsView = () => {
  const { userTransactions ,loading} = useExpense();

  const [selectedFilter, setSelectedFilter] = useState('Today'); // Today, Week, Month

   const [filteredTransactions, setFilteredTransactions] = useState([]); //topSpendings

  useEffect(() => {
  const filtered=  filterTransactions(userTransactions, selectedFilter);
     setFilteredTransactions(filtered);
  }, [userTransactions, selectedFilter]);

  const filterTransactions = (transactions, filter) => {
      if (!transactions){
        console.log(transactions, 'in filterTransactions')
return [];
      } 
    const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
console.log('date:',today,'transactions',transactions)
   
return transactions.filter(tx => {
    const [day, month, year] = tx.date.split(' ')[0].split('/');
    const txDate = new Date(`${year}-${month}-${day}`);
    const transactionDate = new Date(txDate.getFullYear(), txDate.getMonth(), txDate.getDate());

    console.log('Parsed transaction date:', transactionDate); 
      if (filter === 'Today') {
        return (
            transactionDate.getDate() === today.getDate() &&
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
        );
      }
       else if (filter === 'Weekly') {
         const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
          return transactionDate >= weekStart && transactionDate <= today;
      }
       else if (filter === 'Monthly') {
             return (
            transactionDate.getMonth() === today.getMonth() &&
            transactionDate.getFullYear() === today.getFullYear()
          );
      }
       else if (filter === 'Yearly') {
           return transactionDate.getFullYear() === today.getFullYear();
      }
      return true;
    });
  };

   // Prepare chart data for both income and expenses
  const prepareChartData = () => {
    if (filteredTransactions.length === 0) return null;
    
    // Group by date and calculate daily net (income - expenses)
    const dailyData = filteredTransactions.reduce((acc, tx) => {
      const date = tx.date.split(' ')[0]; // Get just the date part
      if (!acc[date]) {
        acc[date] = { income: 0, expense: 0 };
      }
      
      if (tx.type === 'Income') {
        acc[date].income += parseFloat(tx.amount);
      } else {
        acc[date].expense += parseFloat(tx.amount);
      }
      
      return acc;
    }, {});
    
    // Sort dates chronologically
    const sortedDates = Object.keys(dailyData).sort((a, b) => {
      const [dayA, monthA, yearA] = a.split('/');
      const [dayB, monthB, yearB] = b.split('/');
      return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
    });
    
    // Prepare data for chart
    return {
      labels: sortedDates,
      datasets: [
        {
          data: sortedDates.map(date => dailyData[date].income),
          color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // Green for income
          strokeWidth: 2,
          label: "Income"
        },
        {
          data: sortedDates.map(date => dailyData[date].expense),
          color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`, // Red for expenses
          strokeWidth: 2,
          label: "Expenses"
        }
      ],
      legend: ["Income", "Expenses"]
    };
  };

  const chartData = prepareChartData();

  const topNavBar=['Today','Weekly','Monthly','Yearly']
  return (
    <View style={styles.main}>
      {/* heading */}
      <Text style={styles.heading}>Statistics</Text>

      {/* topNavBar */}
           <View style={styles.topContainer}>
       {topNavBar.map(period => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedFilter(period)}
            style={[ styles.topButton,
              {
              backgroundColor: selectedFilter === period ? appColors.baseGreen : appColors.neutral600,
            }]}>
            <Text style={{ color: selectedFilter === period ? appColors.white : appColors.black }}>{period}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Chart Section */}
      {chartData && (
        <View style={styles.chartContainer}>
        <BarChart
  data={{
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.datasets[0].data,
        color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`, // Income
      },
      {
        data: chartData.datasets[1].data,
        color: (opacity = 1) => `rgba(200, 0, 0, ${opacity})`, // Expenses
      }
    ],
    legend: chartData.legend
  }}
  width={Dimensions.get('window').width - spacingX._40}
  height={spacingY._160}
  chartConfig={{
    ...chartConfig,
    barPercentage: 0.5,
  }}
  style={styles.chart}
  fromZero
/>
        </View>
      )}

        {/* Headings */}
        <View style={styles.transactionSection}>
              {/* heading */}
      <View style={styles.tile}>
        <Text style={styles.title}>Top Spendings</Text>
        <Text style={styles.end}>See All</Text>
      </View>

       {/* transaction */}
             {loading ? (
             <ActivityIndicator size="large" color={appColors.baseGreen} />
         ): filteredTransactions.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {filteredTransactions.map((trans, index) => (
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
        <Text style={styles.noDataText}>No Transactions </Text>
      )}
        </View>

    </View>
   
  );
};


export default AnalyticsView

const styles = StyleSheet.create({

  main:{
    flex:1,
    marginHorizontal:spacingX._25
  },
  heading:{
    marginTop:spacingY._50,
    fontSize: spacingY._25,
     fontWeight: 'bold',
     color:appColors.baseGreen,
     textAlign:'center',
    marginBottom: spacingY._25
  },
  topContainer:{
     flexDirection: 'row',
      marginBottom:spacingX._30 ,
        gap:spacingX._15
  },
  topButton:{
    paddingVertical: spacingY._7,
    paddingHorizontal: spacingX._15,
    borderRadius: radius._30,
  
  },
  transactionSection: {
    marginTop:spacingY._20,
    flex: 5,
  },
    tile: {
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
  },
    chartContainer: {
    marginVertical: spacingY._2,
    padding: spacingX._2,
    backgroundColor: appColors.white,
    borderRadius: radius._8,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacingY._1,
    paddingHorizontal: spacingX._1,
    color: appColors.black,
  },
  chart: {
    borderRadius: radius._8,
    marginVertical: spacingY._1,
  },
})