import { Flex, Input, Collapse, List, ListItem, Tag, InputRightElement, InputGroup, TagLabel, TagCloseButton, Skeleton, Text } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import TextItem from './TextItem';

export default function InputList({ value, tagValue, onChange, removeItem, placeholder, size, message, onFocus, onBlur, isOpen, items, mt, loading, pickItem }) {
  const iconRight = isOpen ? <ArrowDownIcon w={6} h={6} color="blue.500" /> : <ArrowForwardIcon w={6} h={6} color="blue.500"/>;

  return (
    <Flex position='relative' direction='column' mt={mt}>
      <InputGroup alignItems='center' position='relative'>
        <Input id='ds-input'
          placeholder={placeholder}
          size={size}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={!!tagValue}
          onChange={e => onChange(e.target.value)}>
        </Input>
        {tagValue ?
          <Tag
            position='absolute'
            size='md'
            key='md'
            margin='8px'
            zIndex='3'
            borderRadius='full'
            variant='solid'
            colorScheme='blue'>
            <TagLabel>{tagValue}</TagLabel>
            <TagCloseButton opacity='1' onClick={e => removeItem(e)}/>
          </Tag>
        : ''}
        <InputRightElement>
          {iconRight}
        </InputRightElement>
      </InputGroup>
      <Collapse in={isOpen }transition={{enter: {duration: 0.5}}}>
        <List w='100%' position='absolute' boxShadow='lg' p='4' rounded='md' bg='white' mt='2px' spacing={3}>
          {loading ?
            <Skeleton height='20px' />
            : items?.length <= 0 ?
            <Text color='gray.500'>{message}</Text>
            :
            items?.map((item, index) => {
              return (
                <ListItem p='2' lineHeight='40px' _hover={{background: '#F8F6F4', color: 'blue.500'}} cursor='pointer' key={index} onClick={() => pickItem(item)}>
                  <TextItem
                    name={item.name}>
                  </TextItem>
                </ListItem>
              );
            })
          }
        </List>
      </Collapse>
    </Flex>
  );
}
