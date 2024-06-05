import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Suspense } from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import { Provider } from 'react-redux';
import store from './store';
import Loader from './components/ui/Loader';
import DatabaseLoader from './components/DatabaseLoader';
import HeaderTitle from './components/ui/HeaderTitle';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <Provider store={store}>
      <DatabaseLoader>
        <NavigationContainer>
          <Suspense fallback={<Loader />}>
            <SQLiteProvider databaseName='mySQLiteDB.db' useSuspense>
              <Stack.Navigator>
                <Stack.Screen 
                  name="Home" 
                  component={Home}
                  options={{
                    headerTitle: () => <HeaderTitle />,
                    headerLargeTitle: true,
                  }} 
                />
              </Stack.Navigator>
            </SQLiteProvider>
          </Suspense>
        </NavigationContainer>
      </DatabaseLoader>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
