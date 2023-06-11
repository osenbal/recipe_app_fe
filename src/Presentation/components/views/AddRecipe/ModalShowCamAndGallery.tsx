import React from 'react';
import {View, Pressable, Modal, StyleSheet} from 'react-native';
import IconCamera from '@assets/icons/icon_camera.svg';
import IconGallery from '@assets/icons/icon_gallery.svg';
import IconCross from '@assets/icons/icon_cross.svg';

import {colors} from '@assets/colors/colors';

type Props = {
  modalInput: boolean;
  setModalInput: (modalInput: boolean) => void;
  openCamera: () => void;
  openGallery: () => void;
};

const ModalShowCamAndGallery: React.FC<Props> = ({
  modalInput,
  setModalInput,
  openCamera,
  openGallery,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInput}
        onRequestClose={() => {
          setModalInput(!modalInput);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={{
                position: 'absolute',
                right: 15,
                top: 10,
                backgroundColor: 'red',
                width: 30,
                height: 30,
                borderRadius: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => setModalInput(false)}>
              <IconCross />
            </Pressable>
            <View
              style={{
                marginVertical: 24,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                columnGap: 24,
              }}>
              <Pressable
                onPress={openCamera}
                style={{
                  backgroundColor: colors.neutralColors.gray3,
                  width: 44,
                  height: 44,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <IconCamera />
              </Pressable>

              <Pressable
                onPress={openGallery}
                style={{
                  backgroundColor: colors.neutralColors.gray3,
                  width: 44,
                  height: 44,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <IconGallery />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalShowCamAndGallery;
