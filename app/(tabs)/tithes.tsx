import * as Clipboard from 'expo-clipboard'

import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'

import { Copy } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import itauLogo from '../../src/assets/itauLogo.png'
import pixLogo from '../../src/assets/pixLogo.png'
import santanderLogo from '../../src/assets/santanderLogo.png'
import sicoobLogo from '../../src/assets/sicoobLogo.png'

const tithes = [
  {
    id: '1',
    bank: 'Banco Itaú - 341',
    agency: 'Agência: 2997',
    account: 'C/C: 23592-0',
    bankLogo: itauLogo,
  },
  {
    id: '2',
    bank: 'Banco Santander - 033',
    agency: 'Agência: 1471',
    account: 'C/C: 13-003001-5',
    bankLogo: santanderLogo,
  },
  {
    id: '3',
    bank: 'SICOOB - 756',
    agency: 'Agência: 4222-6',
    account: 'C/C: 13025-7',
    bankLogo: sicoobLogo,
  },
  {
    id: '4',
    bank: 'CHAVE PIX - CNPJ',
    agency: '08.947.952/0001-29',
    bankLogo: pixLogo,
  },
]

export default function Tithes() {
  const { top, bottom } = useSafeAreaInsets()

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('08.947.952/0001-29')
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Chave PIX copiada com sucesso! ✅',
      text2: 'Agora é só colar no aplicativo do seu banco.',
    })
  }

  return (
    <View
      className="bg-gray-50 flex-1 px-5"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <Text className="text-gray-950 text-xl font-title mt-2">
        Dízimos e Ofertas
      </Text>

      <FlatList
        data={tithes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex flex-row items-center gap-5 py-4">
            <Image
              source={item.bankLogo}
              className="w-28 h-28"
              style={{ resizeMode: 'contain' }}
              alt="Logo do banco"
            />

            <View className="flex flex-col items-start justify-start">
              <Text className="text-gray-950 text-lg font-title">
                {item.bank}
              </Text>
              <Text className="text-gray-950 text-lg font-body">
                {item.agency}
              </Text>
              {item.account && (
                <Text className="text-gray-950 text-lg font-body">
                  {item.account}
                </Text>
              )}
            </View>
          </View>
        )}
        className="mt-4 px-1"
        ItemSeparatorComponent={() => (
          <View className="h-1 border border-gray-200" />
        )}
      />

      <TouchableOpacity onPress={copyToClipboard}>
        <View className="flex-row items-center justify-center gap-2">
          <Text className="text-gray-950 text-lg font-title mt-2 text-center">
            Toque para copiar a chave PIX
          </Text>
          <Copy size={28} weight="bold" />
        </View>
      </TouchableOpacity>
    </View>
  )
}
