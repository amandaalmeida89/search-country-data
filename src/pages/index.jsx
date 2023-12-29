'use client'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLazyQuery, gql } from "@apollo/client";
import { Container, Text, Heading, Center, Flex, Wrap, WrapItem } from '@chakra-ui/react'
import Image from 'next/image'
import InputList from '../components/InputList'
import TextItem from '../components/TextItem'
import debounce from 'lodash.debounce';

const QUERY = gql`
  query GetCurrency($countryName: String!) {
    item(where: {class_id: {_eq: "Country"}, nameEn: {_ilike: $countryName} }) {
      nameEn
      currency: statements(where: {property_id: {_eq: "currency"}}) {
        object {
          nameEn
        }
      }
    }
  }
`;

export default function Page() {
  const [countryName, setCountryName] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [countryCurrencyItem, setCountryCurrencyItem] = useState('')
  const [countryNameItem, setCountryNameItem] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [searchCountry, { loading, error, data }] = useLazyQuery(QUERY);
  const { item } = data || {};

  const validCountryName = countryName.length >= 3

  const changeHandler = useCallback(() => {
    searchCountry({ variables: { countryName: `${countryName}%` }})
  }, [countryName, searchCountry]);

  const debouncedSendRequest = useMemo(() => {
    return debounce(changeHandler, 300);
  }, [changeHandler]);

  const handleChange = (value) => {
    setCountryName(value)

    if(!validCountryName) {
      handleFeedbackMessage()
      setCountryCurrencyItem('')
      setCountryNameItem('')
      setCountriesList([])
    };
  };

  const handleFeedbackMessage = () => {
    setMessage('Type at least 3 letters to search.')
  };

  const onBlur = () => {
    setOpen(false)
  };

  const onFocus = () => {
    const hasCountriesList = countriesList?.length >= 1

    if(!validCountryName && !hasCountriesList){
      setOpen(true)
      handleFeedbackMessage()
    };

    if(hasCountriesList && validCountryName){
      setOpen(true)
    };
  };

  const pickItem = ({ value, name }) => {
    setCountryCurrencyItem(value)
    setCountryNameItem(name)
    setOpen(false)
  };

  useEffect(() => {
    const validCountriesList = item?.length > 0

    if(validCountryName) {
      debouncedSendRequest()
    };

    if(validCountriesList && validCountryName) {
      const items = item?.map(({ nameEn, currency }) => {
        const currencyCountry = currency[0]?.object?.nameEn
        return {
          name: `(${nameEn})`,
          value: `${currencyCountry}`
        };
      });
      setOpen(true)
      setCountriesList(items)
    } else if(validCountryName && !validCountriesList){
      setCountriesList([])
      setMessage('Currency not found')
    };
  }, [countryName, debouncedSendRequest, item, validCountryName]);

  return (
    <Flex w='100%'>
      <Container p='16' minW= '100%' position='relative' height='100vh' bg='white'>
        <Flex minH='150px' mt='5%' alignItems='center' direction='column'>
          <Heading as='h2' size={['sm', 'md', 'lg', 'xl']} noOfLines={1}>Currency Country</Heading>
          <Text align='center' maxW={['100%', '80%', '60%', '40%']} mt='16px' fontSize={['sm', 'md', 'lg', 'xl']}>The currency not only facilitates commercial exchanges but also reflects the stability and economic strength of a nation.</Text>
        </Flex>
        <Center>
          <Flex height='200px' direction='column' justify='center' maxW='980px' w='100%' border='2px' borderColor='gray.200' boxShadow='md' p='6' rounded='md' bg='white'>
            <Text color='#1E1832' as='b' fontSize='lg'>From</Text>
            <InputList
              mt='4px'
              value={countryName}
              onChange={(value) => handleChange(value)}
              pickItem={pickItem}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder='Country Name'
              size='md'
              message={message}
              isOpen={isOpen}
              items={countriesList}
              loading={loading}
              >
            </InputList>
            <TextItem
              mt='16px'
              value={countryCurrencyItem}
              name={countryNameItem}>
            </TextItem>
          </Flex>
        </Center>
      </Container>
      <Flex alignContent='center' justifyContent='center' bg='blue.600' position='fixed' w='100%' bottom='0px'>
        <Wrap p='6'>
          <WrapItem>
            <Center>
              <Text mr='8px' color='white' as='b' fontSize={{ base: "14px", md: "16px", lg: "16px" }}>Copyright &copy; 2023 - by Amanda Nascimento</Text>
              <a target="new" href="https://github.com/amandaalmeida89/datastory-code-challenge">
                <Image width={30} height={30} src='/github.png' alt="github Logo"></Image>
              </a>
            </Center>
          </WrapItem>
        </Wrap>
      </Flex>
    </Flex>
  )
}
