import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

interface InfoButtonProps {
  title: string;
  description: string;
  codeExample?: string;
  parameters?: Array<{
    name: string;
    type: string;
    description: string;
    required?: boolean;
  }>;
  returns?: string;
  notes?: string[];
}

export default function InfoButton({
  title,
  description,
  codeExample,
  parameters,
  returns,
  notes,
}: InfoButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.infoButtonText}>ⓘ</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <ScrollView>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{title}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{description}</Text>
              </View>

              {parameters && parameters.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Parameters</Text>
                  {parameters.map((param, index) => (
                    <View key={index} style={styles.parameterItem}>
                      <View style={styles.parameterHeader}>
                        <Text style={styles.parameterName}>{param.name}</Text>
                        <Text style={styles.parameterType}>{param.type}</Text>
                        {param.required && (
                          <View style={styles.requiredBadge}>
                            <Text style={styles.requiredText}>required</Text>
                          </View>
                        )}
                      </View>
                      <Text style={styles.parameterDescription}>
                        {param.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {returns && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Returns</Text>
                  <Text style={styles.returnsText}>{returns}</Text>
                </View>
              )}

              {codeExample && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Code Example</Text>
                  <View style={styles.codeBlock}>
                    <Text style={styles.codeText}>{codeExample}</Text>
                  </View>
                </View>
              )}

              {notes && notes.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Notes</Text>
                  {notes.map((note, index) => (
                    <View key={index} style={styles.noteItem}>
                      <Text style={styles.noteBullet}>•</Text>
                      <Text style={styles.noteText}>{note}</Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  infoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 18,
    color: '#666',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  parameterItem: {
    marginBottom: 16,
  },
  parameterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  parameterName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Courier',
  },
  parameterType: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  requiredBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  requiredText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  parameterDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
  returnsText: {
    fontSize: 14,
    fontFamily: 'Courier',
    color: '#333',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
  },
  codeBlock: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 13,
    lineHeight: 20,
    color: '#d4d4d4',
  },
  noteItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  noteBullet: {
    fontSize: 16,
    color: '#007AFF',
    marginRight: 8,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
  },
});
