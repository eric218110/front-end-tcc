import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Wrapper,
  Container,
  MapViewContainer,
  ModalizeContainer,
  ContainerAction,
  ContentAction,
  ActionIconFilter,
  ActionIconFixLocation,
  ActionIconAddPoint,
  ItemsListContainer,
  ActionIconCloseDirection,
  AddItemsIcon
} from './styles'
import * as Location from 'expo-location'
import { Alert } from 'react-native'
import { Header } from '../../components/Header'
import { Filter } from '../../components/Item/Filter'
import { Loading } from '../../components/Loading'
import { Modalize } from 'react-native-modalize'
import { Item } from '../../components/Item'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { useItemsContext } from '../../service/context/items-context'
import { usePointContext } from '../../service/context/point-context'
import {
  DirectionsProps,
  DestinationMapsComponent
} from '../../components/Destination'
import { ResponseListPoints } from '../../service/api/points'
import { Point } from '../../components/Point'
import { Callout } from '../../components/Callout'
import { useAccountContext } from '../../service/context/account-context'

export type DestinationPropsCallBackDetailsPoint = Omit<
  DirectionsProps,
  'origin'
>

type IState = {
  latitude: number
  longitude: number
}

export const Map = (): JSX.Element => {
  const [points, setPoints] = useState<ResponseListPoints[]>([])
  const [directionEnable, setDirectionEnable] = useState<DirectionsProps>({
    origin: {
      longitude: 0,
      latitude: 0
    },
    destination: {
      latitude: 0,
      longitude: 0
    }
  })
  const [initialLocation, setInitialLocation] = useState<IState>({
    latitude: 0,
    longitude: 0
  })
  const { getItemsSelected } = useItemsContext()
  const { loadPoints } = usePointContext()
  const navigation = useNavigation()
  const itemsSelected = getItemsSelected()
  const modalRefFilterItems = useRef<Modalize>(null)
  const mapRef = useRef<MapView>(null)
  const { getAccount } = useAccountContext()
  const [account, setAccount] = useState<{ role: string }>({ role: '' })

  useEffect(() => {
    async function setAccountDataInitial() {
      const { role } = getAccount
      setAccount({ role })
    }
    setAccountDataInitial()
  }, [getAccount])

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync()

      if (status !== 'granted') {
        Alert.alert('Error', 'Permission location')
        return
      }

      const location = await Location.getCurrentPositionAsync({})
      const { latitude, longitude } = location.coords
      setInitialLocation({ latitude, longitude })
    }

    loadPosition()
  }, [])

  useEffect(() => {
    setDirectionEnable({
      origin: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        longitude: 0,
        latitude: 0
      }
    })
  }, [])

  useEffect(() => {
    async function pointsLoad() {
      const ids = itemsSelected
        .filter(item => item.active)
        .map(item => item.id)
        .join()

      const { data, error } = await loadPoints({ ids })
      if (!error) {
        setPoints(data)
      }
    }
    pointsLoad()
  }, [itemsSelected])

  const handleCloseNavigationDirection = useCallback(() => {
    setDirectionEnable({
      origin: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        longitude: 0,
        latitude: 0
      }
    })
  }, [directionEnable])

  const handleDirectionCallBack = useCallback(
    ({ destination }: DestinationPropsCallBackDetailsPoint) => {
      async function setDestination() {
        const location = await Location.getCurrentPositionAsync({})
        const { latitude, longitude } = location.coords
        setDirectionEnable({
          origin: {
            latitude,
            longitude
          },
          destination
        })
      }
      setDestination()
    },
    [directionEnable]
  )

  const handleNavigateAddPoint = useCallback(() => {
    navigation.navigate('AddPoint')
  }, [])

  const handleNavigateAddItem = useCallback(() => {
    navigation.navigate('AddItem')
  }, [])

  const handleZoomInCurrentLocation = useCallback(async () => {
    const location = await Location.getCurrentPositionAsync()
    const { latitude, longitude } = location.coords
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008
    })
  }, [])

  const handleOnOpenModalFilterItems = () => {
    modalRefFilterItems.current?.open()
  }

  const getColorPoint = useCallback(
    ({ items }: { items: string[] }): string | undefined => {
      const itemsActiveLenght = itemsSelected
        .filter(item => item.active)
        .map(item => item.id)
      if (itemsActiveLenght.length !== 1) return undefined
      if (items.length === 1) return items[0]
    },
    [itemsSelected]
  )

  return (
    <Wrapper>
      <Header />
      <Container style={{ alignItems: 'center' }}>
        {initialLocation.latitude !== 0 ? (
          <>
            <MapViewContainer
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: initialLocation.latitude,
                longitude: initialLocation.longitude,
                latitudeDelta: 0.014,
                longitudeDelta: 0.014
              }}
            >
              {directionEnable.origin.latitude !== 0 && (
                <DestinationMapsComponent
                  destination={directionEnable.destination}
                  origin={directionEnable.origin}
                  onReady={() =>
                    mapRef.current?.fitToCoordinates(
                      [
                        {
                          latitude: directionEnable.origin.latitude,
                          longitude: directionEnable.origin.longitude
                        },
                        {
                          latitude: directionEnable.destination.latitude,
                          longitude: directionEnable.destination.longitude
                        }
                      ],
                      { animated: true }
                    )
                  }
                />
              )}
              {points.length > 0 &&
                points.map(({ id, latitude, longitude, items, name }) => (
                  <Marker
                    key={id}
                    coordinate={{
                      latitude: Number(latitude),
                      longitude: Number(longitude)
                    }}
                  >
                    <Point
                      backgroundColor={getColorPoint({
                        items: items.map(item => item.color)
                      })}
                    />
                    <Callout
                      title={name}
                      colorsItems={items.map(item => item.color)}
                      onPress={event => {
                        if (event.nativeEvent.action === 'callout-press') {
                          navigation.navigate('DetailsPoint', {
                            id,
                            handleDirectionCallBack
                          })
                        }
                      }}
                    />
                  </Marker>
                ))}
            </MapViewContainer>
          </>
        ) : (
          <Loading />
        )}
      </Container>
      <ContainerAction>
        {directionEnable.origin.latitude !== 0 ? (
          <ContentAction onPress={handleCloseNavigationDirection}>
            <ActionIconCloseDirection />
          </ContentAction>
        ) : (
          <>
            {account.role === 'admin' && (
              <ContentAction onPress={handleNavigateAddItem}>
                <AddItemsIcon />
              </ContentAction>
            )}
            <ContentAction onPress={handleOnOpenModalFilterItems}>
              <ActionIconFilter />
            </ContentAction>
            <ContentAction onPress={handleZoomInCurrentLocation}>
              <ActionIconFixLocation />
            </ContentAction>
            <ContentAction onPress={handleNavigateAddPoint}>
              <ActionIconAddPoint />
            </ContentAction>
          </>
        )}
      </ContainerAction>
      <ModalizeContainer ref={modalRefFilterItems}>
        <Filter title="Filtre os items" />
      </ModalizeContainer>
      <ItemsListContainer>
        {itemsSelected.map(({ id, title, active, color, activeColor }) =>
          active ? (
            <Item
              name={title}
              key={id}
              colorBackground={color}
              activeColor={activeColor}
            />
          ) : null
        )}
      </ItemsListContainer>
    </Wrapper>
  )
}
