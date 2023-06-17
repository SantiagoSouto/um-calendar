import { YStack } from 'tamagui'

import React, { useState } from 'react';
import { Select, Adapt, Sheet, getFontSize } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import {
  XStack,
} from 'tamagui'


export function SelectItem(props) {
  const { subjects, onSelect } = props;

  const handleValueChange = (value) => {
    onSelect(value);
  };

  return (
    <Select onValueChange={handleValueChange} {...props}>
      <Select.Trigger width={350} iconAfter={ChevronDown}>
        <Select.Value placeholder="Materias" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet native modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <XStack>
            <Select.Group space="$0">
              <Select.Label>Materias</Select.Label>
              {subjects.map((item, i) => {
                return (
                  <Select.Item index={i} key={item.name} value={item.name}>
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )
              })}
            </Select.Group>
            {props.native && (
              <YStack
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                alignItems="center"
                justifyContent="center"
                width={'$4'}
                pointerEvents="none"
              >
                <ChevronDown size={getFontSize((props.size ?? '$true'))} />
              </YStack>
            )}
          </XStack>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}
