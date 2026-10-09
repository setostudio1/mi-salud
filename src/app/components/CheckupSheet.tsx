import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

const days = ['Lun 12', 'Mar 13', 'Mié 14', 'Jue 15', 'Vie 16'];

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (day: string) => void;
};

export default function CheckupSheet({
  visible,
  onClose,
  onConfirm,
}: Props) {
  const [selected, setSelected] = useState('');

  function handleConfirm() {
    if (selected === '') return;

    onConfirm(selected);
    setSelected('');
    onClose();
  }

  function handleClose() {
    setSelected('');
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>

        {/* Fondo oscuro detrás de la hoja */}
        <Pressable
          style={styles.backdrop}
          onPress={handleClose}
        />

        {/* Hoja de selección */}
        <View style={styles.sheet}>

          <View style={styles.handle} />

          <Text style={styles.title}>
            Agenda tu chequeo
          </Text>

          <Text style={styles.subtitle}>
            Elige el día que prefieras
          </Text>

          {/* Días seleccionables */}
          <View style={styles.days}>
            {days.map((day) => (
              <Pressable
                key={day}
                onPress={() => {
                  setSelected(day);
                  console.log('Día seleccionado:', day);
                }}
                style={[
                  styles.chip,
                  selected === day && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selected === day && styles.chipTextSelected,
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Botón confirmar */}
          <Pressable
            onPress={handleConfirm}
            disabled={selected === ''}
            style={[
              styles.confirmButton,
              selected === '' && styles.confirmButtonDisabled,
            ]}
          >
            <Text style={styles.confirmText}>
              Confirmar
            </Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  backdrop: {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
},

  sheet: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    gap: 12,
  },

  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.soft,
    marginBottom: 8,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },

  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },

  chip: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.soft,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chipSelected: {
    backgroundColor: colors.dark,
  },

  chipText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },

  confirmButton: {
    backgroundColor: colors.pink,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  confirmButtonDisabled: {
    opacity: 0.4,
  },

  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});