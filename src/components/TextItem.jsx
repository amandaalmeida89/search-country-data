import { Flex, Text } from '@chakra-ui/react'

export default function TextItem({ value, name, mt }) {

  return (
    <Flex mt={mt}>
      <Text fontSize={{ base: '14px', md: '16px', lg: '16px' }}>{value}</Text>&nbsp;
      <Text fontSize={{ base: '14px', md: '16px', lg: '16px' }} as='b'>{name}</Text>
    </Flex>
  )
};
