import * as WebBrowser from 'expo-web-browser'

import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useEffect, useState } from 'react'

import { Crosshair } from 'phosphor-react-native'
import { PlaylistCarousel } from '../../src/components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { youtubeAPI } from '../../src/services'

interface VideoPlayList {
  index: number
  type: string
  video: {
    videoId: string
    title: string
    thumbnails: {
      videoId: string
      url: string
      title: string
      height: number
      width: number
    }
    lengthSeconds: number
    isLiveNow: boolean
    author: {
      canonicalBaseUrl: string
      channelId: string
      title: string
    }
  }
}

export default function Playlist() {
  const { top, bottom } = useSafeAreaInsets()
  const [missionsVideos, setMissionsVideos] = useState<VideoPlayList[]>([])
  const [messagesVideos, setMessagesVideos] = useState<VideoPlayList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getMessageVideos() {
    const response = await youtubeAPI.get('/playlist/videos/', {
      params: {
        id: 'PLicFu6m57-vAKdPUs9NpQxtHt5MobZwIF',
        hl: 'pt',
        gl: 'BR',
      },
    })

    const orderByReverse = response.data.contents.reverse()

    setMessagesVideos(orderByReverse)
  }

  async function getMissionsVideos() {
    const response = await youtubeAPI.get('/playlist/videos/', {
      params: {
        id: 'PLicFu6m57-vBF1InJQGvi3hI_p2YDUOFY',
        hl: 'pt',
        gl: 'BR',
      },
    })

    setMissionsVideos(response.data.contents)
  }

  async function handleOpenVideoOnYouTube(videoId: string) {
    await WebBrowser.openBrowserAsync(
      `https://www.youtube.com/watch?v=${videoId}`,
    )
  }

  useEffect(() => {
    async function getVideos() {
      await Promise.all([getMessageVideos(), getMissionsVideos()])

      setIsLoading(false)
    }

    getVideos()
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50 px-5"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <Text className="text-gray-950 text-xl font-title mt-2">
        Mensagens 2023
      </Text>

      <ImageBackground
        source={{
          uri: messagesVideos[0]?.video.thumbnails[3].url,
        }}
        className={`mt-5 rounded-lg overflow-hidden aspect-video w-full ${
          messagesVideos[0].video.isLiveNow && 'border-2 border-red-500'
        }`}
      >
        <TouchableOpacity
          onPress={() => {
            handleOpenVideoOnYouTube(messagesVideos[0].video.videoId)
          }}
          className="flex-1"
        />
      </ImageBackground>

      {messagesVideos[0].video.isLiveNow && (
        <View className="flex-row items-center justify-center gap-1 mt-1">
          <Crosshair size={18} color="#7f1d1d" weight="bold" />
          <Text className="text-red-900 font-body text-sm uppercase">
            Estamos ao vivo 👆🏼
          </Text>
        </View>
      )}

      <PlaylistCarousel
        title="Mensagens anteriores"
        data={messagesVideos}
        hasSpotlight
        onPress={handleOpenVideoOnYouTube}
      />

      <PlaylistCarousel
        title="Missões"
        data={missionsVideos}
        onPress={handleOpenVideoOnYouTube}
      />
    </ScrollView>
  )
}
