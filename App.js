import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, StatusBar } from 'react-native';
import CoinItem from './Components/CoinItem'

export default function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    const data = await res.json()
    setCoins(data)

  }



  useEffect(() => {
    loadData()
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#141414' />
      
      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput style={styles.search}
        placeholder="Search a Coin"
        placeholderTextColor={'#858585'}
        onChangeText={text => setSearch(text)}
        />
      </View>

      <FlatList
      style={styles.list}
      data={coins.filter((coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search) )}
      renderItem={({item}) => {
        return <CoinItem coins={item} />
      }}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={async() => {
        setRefreshing(true)
        await loadData();
        setRefreshing(false)
      }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 22,
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  search: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  },
});
