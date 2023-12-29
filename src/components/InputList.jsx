import { useEffect, useState } from 'react';
import { Flex, Input, Collapse, List, ListItem, IconButton, InputRightElement, InputGroup, Skeleton, Text } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import TextItem from './TextItem'

export default function InputList({ value, onChange, placeholder, size, message, onFocus, onBlur, isOpen, items, mt, loading, pickItem }) {
  const [inputWidth, setInputWidth] = useState('50%');

  const iconRight = isOpen ? <ArrowDownIcon /> : <ArrowForwardIcon/>

  useEffect(() => {
    const inputSize = document?.querySelectorAll('#ds-input')[0].clientWidth
    if(inputSize > 0) {
      setInputWidth(`${inputSize}px`)
    }
  }, []);

  return (
    <Flex direction='column' mt={mt}>
      <InputGroup>
        <Input id="ds-input"
          placeholder={placeholder}
          size={size}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => onChange(e.target.value)}/>
        <InputRightElement>
          <IconButton aria-label='clear input' colorScheme='blue' icon={iconRight} />
        </InputRightElement>
      </InputGroup>
      <Collapse in={isOpen }transition={{enter: {duration: 0.5}}}>
        <List w={inputWidth} position='absolute' boxShadow='lg' p='4' rounded='md' bg='white' mt='2px' spacing={3}>
          {loading ?
            <Skeleton height='20px' />
            : items?.length <= 0 ?
            <Text color='gray.500'>{message}</Text>
            :
            items?.map(({ name, value }, index) => {
              return (
                <ListItem p='2' lineHeight='40px' _hover={{background: "#F8F6F4", color: "blue.500"}} cursor='pointer' key={index} onClick={(e) => pickItem({ value, name })}>
                  <TextItem
                    value={value}
                    name={name}>
                  </TextItem>
                </ListItem>
              )
            })
          }
        </List>
      </Collapse>
    </Flex>
  )
}
