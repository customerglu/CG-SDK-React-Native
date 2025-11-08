import { View, Text, StyleSheet, ScrollView } from 'react-native';

export interface LogEntry {
  type: 'success' | 'error' | 'info' | 'request';
  message: string;
  data?: any;
  timestamp: string;
}

interface ResponseLogProps {
  logs: LogEntry[];
  maxHeight?: number;
}

export default function ResponseLog({ logs, maxHeight = 200 }: ResponseLogProps) {
  if (logs.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Response Log</Text>
      <ScrollView
        style={[styles.logContainer, { maxHeight }]}
        nestedScrollEnabled
      >
        {logs.map((log, index) => (
          <View
            key={index}
            style={[
              styles.logEntry,
              log.type === 'success' && styles.successEntry,
              log.type === 'error' && styles.errorEntry,
              log.type === 'info' && styles.infoEntry,
              log.type === 'request' && styles.requestEntry,
            ]}
          >
            <View style={styles.logHeader}>
              <View style={[
                styles.typeBadge,
                log.type === 'success' && styles.successBadge,
                log.type === 'error' && styles.errorBadge,
                log.type === 'info' && styles.infoBadge,
                log.type === 'request' && styles.requestBadge,
              ]}>
                <Text style={styles.typeBadgeText}>
                  {log.type === 'success' ? '✓' :
                   log.type === 'error' ? '✗' :
                   log.type === 'request' ? '→' : 'i'}
                </Text>
              </View>
              <Text style={styles.timestamp}>{log.timestamp}</Text>
            </View>
            <Text style={styles.logMessage}>{log.message}</Text>
            {log.data && (
              <View style={styles.dataContainer}>
                <Text style={styles.dataLabel}>Data:</Text>
                <Text style={styles.dataText}>
                  {typeof log.data === 'string'
                    ? log.data
                    : JSON.stringify(log.data, null, 2)}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  logContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  logEntry: {
    marginTop: 8,
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 3,
  },
  successEntry: {
    backgroundColor: '#f0f9f4',
    borderLeftColor: '#34C759',
  },
  errorEntry: {
    backgroundColor: '#fff3f3',
    borderLeftColor: '#FF3B30',
  },
  infoEntry: {
    backgroundColor: '#f0f7ff',
    borderLeftColor: '#007AFF',
  },
  requestEntry: {
    backgroundColor: '#fef9f0',
    borderLeftColor: '#FF9500',
  },
  logHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  typeBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  successBadge: {
    backgroundColor: '#34C759',
  },
  errorBadge: {
    backgroundColor: '#FF3B30',
  },
  infoBadge: {
    backgroundColor: '#007AFF',
  },
  requestBadge: {
    backgroundColor: '#FF9500',
  },
  typeBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    fontFamily: 'Courier',
  },
  logMessage: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  dataContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 4,
  },
  dataLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  dataText: {
    fontSize: 11,
    fontFamily: 'Courier',
    color: '#444',
  },
});
