import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Suspense, useEffect, useState } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator(); 

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";       // Database name
  const dbAsset = require("./assets/mySQLiteDB.db");    // Database asset
  const dbUri = Asset.fromModule(dbAsset).uri;      // Database URI
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;     // Database file path

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);               // File info
  if (!fileInfo.exists) {                                                   // If file doesn't exist
    await FileSystem.makeDirectoryAsync(    // Create directory               
    `${FileSystem.documentDirectory}SQLite`,    // Directory path
     { intermediates: true });
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase().then(() => {
      setDbLoaded(true);
    })
  .catch((err) => {
    console.error(err);
  });
  }, []);


  if (!dbLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Suspense
      fallback = {
        <View style={styles.container}>
          <Text>Loading...</Text>
          <StatusBar style="auto" />
        </View>
      }>
        <SQLiteProvider databaseName='mySQLiteDB.db' useSuspense>
          <Stack.Navigator>
            <Stack.Screen name="Home" 
              component={Home}
              options={
                { headerTitle: 'Budget Bunny',
                  headerLargeTitle: true,
                 }
              } />
          </Stack.Navigator>
        </SQLiteProvider>
      </Suspense>
    </NavigationContainer>
    )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
