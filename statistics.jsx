import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ExpenseContext } from '../../context/expenseContext';
import { LineChart } from 'react-native-chart-kit';
import { appColors } from '../../constants/colors'; // ✅ App-wide colors used

const Statistics = () => {
  const { userTransactions } = useContext(ExpenseContext);

  const sortedTransactions = [...userTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  const labels = sortedTransactions.map((txn, index) =>
    index % 2 === 0 ? txn.date.split('T')[0].slice(5) : ''
  );
  const amounts = sortedTransactions.map(txn => txn.amount);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Statistics</Text>

      <LineChart
        data={{
          labels: labels,
          datasets: [{ data: amounts }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisLabel="Rs "
        chartConfig={{
          backgroundColor: appColors.white,
          backgroundGradientFrom: appColors.white,
          backgroundGradientTo: appColors.white,
          decimalPlaces: 0,
          color: (opacity = 1) => appColors.baseGreen + Math.floor(opacity * 255).toString(16), 
          labelColor: (opacity = 1) => appColors.lightBaseGreen, 
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: appColors.baseGreen,
          }
        }}
        bezier
        style={styles.chart}
      />

      <Text style={styles.subHeading}>Transaction History</Text>
      <FlatList
        data={sortedTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.txnTitle}>{item.title} - Rs {item.amount}</Text>
            <Text style={styles.txnDate}>{item.date.split('T')[0]}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: appColors.white,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: appColors.baseGreen,
    marginBottom: 20,
    alignSelf: 'center',
  },
  chart: {
    borderRadius: 12,
    marginBottom: 30,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: appColors.baseGreen,
    marginBottom: 15,
    alignSelf: 'flex-start',
    width: '100%',
  },
  transactionItem: {
    backgroundColor: appColors.lightBaseGreen,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    width: Dimensions.get('window').width - 40,
  },
  txnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: appColors.white,
  },
  txnDate: {
    fontSize: 14,
    color: appColors.white,
    marginTop: 4,
  },
});

export default Statistics;