import { Text, Center, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import Image from 'next/image';

export default function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <Flex alignContent='center' justifyContent='center' bg='blue.600' position='fixed' w='100%' bottom='0px'>
      <Wrap p='6'>
        <WrapItem>
          <Center>
            <Text mr='8px' color='white' fontSize={{ base: '14px', md: '16px', lg: '16px' }}>Copyright &copy; {currentYear} - by Amanda Nascimento</Text>
            <a target='new' href='https://github.com/amandaalmeida89/datastory-code-challenge'>
              <Image width={30} height={30} src='/github.png' alt='github Logo'></Image>
            </a>
          </Center>
        </WrapItem>
      </Wrap>
    </Flex>
  );
}
