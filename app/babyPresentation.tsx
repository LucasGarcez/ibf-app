import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker'
import Toast from 'react-native-toast-message'
import { useState } from 'react'

export default function BabyPresentation() {
  const [worshipOpen, setWorshipOpen] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [worshipDate, setWorshipDate] = useState(null)
  const [isMember, setIsMember] = useState(null)

  const [worshipItems, setWorshipItems] = useState([
    {
      label: 'Domingo - 10h',
      value: 'sunday10',
    },
    {
      label: 'Domingo - 18h',
      value: 'sunday18',
    },
    {
      label: 'Domingo - 20h',
      value: 'sunday20',
    },
    {
      label: 'Quarta - 20h',
      value: 'wednesday20',
    },
  ])

  const [memberItems, setMemberItems] = useState([
    {
      label: 'Sim',
      value: true,
    },
    {
      label: 'Não',
      value: false,
    },
  ])

  function handleCreateBabyPresentation() {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Solicitação enviada com sucesso! 👶🏼',
      text2: 'Em breve entraremos em contato com você.',
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-5">
        <Text className="text-gray-950 text-base font-title mt-2">
          Preencha o formulário abaixo para apresentar seu bebê em nossa Igreja
        </Text>

        <View className="mt-5 flex flex-1 flex-col space-y-5">
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg font-body"
            placeholder="Nome da mãe"
            placeholderTextColor="#A0AEC0"
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg font-body"
            placeholder="Nome do pai"
            placeholderTextColor="#A0AEC0"
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg font-body"
            placeholder="Telefone"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg font-body"
            placeholder="Nome do bebê"
            placeholderTextColor="#A0AEC0"
          />

          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 text-lg font-body"
            placeholder="Idade"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
          />

          <View>
            <DropDownPicker
              open={worshipOpen}
              value={worshipDate}
              items={worshipItems}
              setOpen={setWorshipOpen}
              setValue={setWorshipDate}
              setItems={setWorshipItems}
              placeholder="Selecione uma data"
              placeholderStyle={{
                color: '#A0AEC0',
                fontSize: 18,
                fontFamily: 'Poppins_400Regular',
              }}
              style={{
                backgroundColor: '#f9fafb',
                borderColor: '#d1d5db',
              }}
              zIndex={3000}
              zIndexInverse={1000}
              dropDownDirection="TOP"
            />
          </View>

          <View>
            <DropDownPicker
              open={memberOpen}
              value={isMember}
              items={memberItems}
              setOpen={setMemberOpen}
              setValue={setIsMember}
              setItems={setMemberItems}
              placeholder="É membro da IBF?"
              placeholderStyle={{
                color: '#A0AEC0',
                fontSize: 18,
                fontFamily: 'Poppins_400Regular',
              }}
              style={{
                backgroundColor: '#f9fafb',
                borderColor: '#d1d5db',
              }}
              zIndex={3000}
              zIndexInverse={1000}
              dropDownDirection="TOP"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            className="items-center rounded-lg bg-green-900 py-5"
            onPress={handleCreateBabyPresentation}
          >
            <Text className="font-title text-lg uppercase text-white">
              Enviar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
