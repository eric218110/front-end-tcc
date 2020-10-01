import React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../styles/colors'
import { Platform } from 'react-native'
import Constants from 'expo-constants'
import MapView, { Marker } from 'react-native-maps'
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
  background: ${colors.background};
  flex: 1;
  padding-top: ${statusBarHeight}px;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
`

export const MapViewContainer = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const MarkerWrapper = styled(Marker)``

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
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
`
export const ActionIconFilter = styled(Feather).attrs({
  name: 'filter',
  size: 24,
  color: '#FFF'
})``

export const ActionIconFixLocation = styled(Ionicons).attrs({
  name: 'md-locate',
  size: 24,
  color: '#FFF'
})``

export const ActionIconAddPoint = styled(MaterialIcons).attrs({
  name: 'add',
  size: 24,
  color: '#FFF'
})``

export const ActionIconCloseDirection = styled(MaterialCommunityIcons).attrs({
  name: 'map-marker-remove',
  size: 24,
  color: '#FFF'
})``

export const HeaderModalContainer = styled.View`
  align-items: center;
  margin-top: 7px;
`

const HeaderModal = styled.View`
  width: 65px;
  height: 5px;
  border-radius: 9px;
  background: ${colors.secundary};
`

export const ModalizeContainer = styled(Modalize).attrs(() => {
  return {
    snapPoint: 569,
    withHandle: false,
    HeaderComponent: (
      <HeaderModalContainer>
        <HeaderModal />
      </HeaderModalContainer>
    )
  }
})``

export const ContainerCallout = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  padding: 3px 20px 3px 20px;
`

export const ContainerCalloutText = styled.View`
  flex: 1;
`

export const TextCallout = styled.Text`
  font-size: 18px;
  font-family: roboto_700;
  text-transform: uppercase;
  color: ${colors.primary};
`

export const DividerCallout = styled.View`
  flex: 1;
`

export const IconLinkDetailsPoint = styled(Feather).attrs({
  name: 'external-link',
  size: 24,
  color: colors.primary
})`
  margin-left: 10px;
`
