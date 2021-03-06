import React from 'react'
import styled from 'styled-components/native'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import MapView from 'react-native-maps'
import { Modalize } from 'react-native-modalize'
import { RectButton } from 'react-native-gesture-handler'
import {
  Feather,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons
} from '@expo/vector-icons'

const statusBarHeight =
  Platform.OS === 'android' ? Constants.statusBarHeight : 0

export const Wrapper = styled.SafeAreaView`
  background: ${({ theme }) => theme.background};
  flex: 1;
  padding-top: ${statusBarHeight}px;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const MapViewContainer = styled(MapView).attrs(({ theme }) => ({
  showsUserLocation: true,
  showsMyLocationButton: false,
  showsTraffic: false,
  showsCompass: false,
  showsBuildings: false,
  showsIndoors: false,
  showsScale: false,
  showsIndoorLevelPicker: false,
  showsPointsOfInterest: false,
  customMapStyle: theme.mapStyle
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.backgroundSecundary};
`

export const ItemsListContainer = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false
}))`
  height: 38px;
  width: 100%;
  position: absolute;
  bottom: 36px;
  padding-left: 12px;
`

export const ContainerAction = styled.View`
  position: absolute;
  right: 13px;
  bottom: 91px;
`

export const ContentAction = styled(RectButton)`
  border-radius: 25px;
  height: 45px;
  width: 45px;
  margin-top: 22px;
  background: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`

const HeaderModalContainer = styled.View`
  align-items: center;
  margin-top: 7px;
`

const HeaderModal = styled.View`
  width: 65px;
  height: 5px;
  border-radius: 9px;
  background: ${({ theme }) => theme.actions.disable.light};
`

export const ModalizeContainer = styled(Modalize).attrs(({ theme }) => {
  return {
    snapPoint: 569,
    withHandle: false,
    modalStyle: {
      backgroundColor: theme.background
    },
    HeaderComponent: (
      <HeaderModalContainer>
        <HeaderModal />
      </HeaderModalContainer>
    )
  }
})``

export const ActionIconFilter = styled(Feather).attrs(({ theme }) => ({
  name: 'filter',
  size: 24,
  color: theme.text.light
}))``

export const ActionIconFixLocation = styled(Ionicons).attrs(({ theme }) => ({
  name: 'md-locate',
  size: 24,
  color: theme.text.light
}))``

export const ActionIconAddPoint = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'add',
  size: 24,
  color: theme.text.light
}))``

export const ActionIconCloseDirection = styled(MaterialCommunityIcons).attrs(
  ({ theme }) => ({
    name: 'map-marker-remove',
    size: 24,
    color: theme.text.light
  })
)``

export const AddItemsIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  name: 'playlist-add',
  size: 24,
  color: theme.text.light
}))``
