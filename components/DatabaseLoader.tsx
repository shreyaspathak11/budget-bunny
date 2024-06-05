import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { StatusBar } from 'expo-status-bar';
import Loader from './ui/Loader';

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("../assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, { intermediates: true });
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

const DatabaseLoader = ({ children }: { children: React.ReactNode }) => {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    loadDatabase().then(() => {
      setDbLoaded(true);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  if (!dbLoaded) {
    return (
      <View style={styles.container}>
         < Loader />
        <StatusBar style="auto" />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DatabaseLoader;
