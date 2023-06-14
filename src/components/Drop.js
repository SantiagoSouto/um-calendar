import { YStack } from 'tamagui'

import React, { useState } from 'react';
import { Select, Adapt, Sheet, getFontSize } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

export function SelectDemoItem({ items }) {
  const [val, setVal] = useState('apple');

  return (
    <Select>
      <Select.Trigger width={200} iconAfter={ChevronDown}>
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
          <ChevronUp size={20} />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group space="$0">
            <Select.Label>Materias</Select.Label>
            {items.map((item, i) => (
              <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                <Select.ItemText>{item.name}</Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  <Check size={16} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <ChevronDown size={20} />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
