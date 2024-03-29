'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import GetCurrencyQuery from '../graphql/queries/getCurrency';
import { Container, Text, Heading, Center, Flex } from '@chakra-ui/react';
import InputList from '../components/InputList';
import TextItem from '../components/TextItem';
import Header from '../components/Header';
import Footer from '../components/Footer';
import messages from '../texts';
import debounce from 'lodash.debounce';

export default function Page() {
  const [countryName, setCountryName] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [countryCurrencyItem, setCountryCurrencyItem] = useState({});
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [searchCountry, { loading, error, data }] = useLazyQuery(GetCurrencyQuery);
  const { countries } = data || {};

  const validCountryName = countryName.length >= 3;

  const sendRequest = useCallback((countryName) => {
    searchCountry({ variables: { countryName }});
  }, [searchCountry]);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendRequest, 300);
  }, [sendRequest]);

  const handleChange = (value) => {
    setCountryName(value);

    if(value?.length >= 3) {
      debouncedSendRequest(value);
    } else {
      handleFeedbackMessage('infoSearch');
      setCountryCurrencyItem({});
      setCountriesList([]);
    }
  };

  const handleFeedbackMessage = (info) => {
    setMessage(messages[info]);
  };

  const onBlur = () => {
    setOpen(false);
  };

  const onFocus = () => {
    const hasCountriesList = countriesList?.length >= 1;
    setOpen(true);

    if(!validCountryName && !hasCountriesList) {
      handleFeedbackMessage('infoSearch');
    }

    if(validCountryName && !hasCountriesList) {
      setCountriesList([]);
      handleFeedbackMessage('currencyNotFound');
    }
  };

  const removeItem = () => {
    setCountryName('');
    setCountryCurrencyItem({});
  };

  const pickItem = ({ name, value, symbol, flag, phoneCode }) => {
    const countryInfo = {
      name,
      value,
      symbol,
      flag,
      phoneCode
    };
    setCountryCurrencyItem(countryInfo);
    setOpen(false);
  };

  useEffect(() => {
    const validCountriesList = countries?.length > 0;

    if(validCountriesList && validCountryName) {
      const items = countries?.map(({ name, flag, currency, symbol, phoneCode }) => {
        return {
          name,
          phoneCode,
          value: currency,
          symbol,
          flag
        };
      });
      setOpen(true);
      setCountriesList(items);
    } else if(validCountryName && !validCountriesList) {
      setCountriesList([]);
      handleFeedbackMessage('currencyNotFound');
    } else if(error) {
      setCountriesList([]);
      setMessage(messages.searchError);
    }
  }, [countryName, countries, validCountryName, error]);

  return (
    <Flex w='100%'>
      <Header></Header>
      <Container p='16' minW= '100%' position='relative' height='100vh' bg='white'>
        <Center minH='150px' mt='5%'>
          <Heading color='blue.500' as='h2' size={['sm', 'md', 'lg', 'xl']} noOfLines={1}>{messages.heding}</Heading>
        </Center>
        <Center>
          <Flex direction='column' justify='center' maxW='980px' w='100%' border='2px' borderColor='gray.200' boxShadow='md' p='6' rounded='md' bg='white'>
            <Text color='blue.500' as='b' fontSize='lg'>From</Text>
            <InputList
              mt='4px'
              value={countryName}
              tagValue={countryCurrencyItem?.name}
              onChange={(value) => handleChange(value)}
              removeItem={removeItem}
              pickItem={pickItem}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={messages.countryName}
              size='md'
              message={message}
              isOpen={isOpen}
              items={countriesList}
              loading={loading}
              >
            </InputList>
            {countryCurrencyItem?.value ?
              <Flex mt='4px' flexDirection={'column'}>
              <TextItem mt='8px' name="Currency:" value={countryCurrencyItem?.value}></TextItem>
              <TextItem mt='8px' name="PhoneCode:" value={countryCurrencyItem?.phoneCode}></TextItem>
              <TextItem mt='8px' name="Symbol:" value={countryCurrencyItem?.symbol}></TextItem>
              <TextItem mt='8px' name="Flag:" value={countryCurrencyItem?.flag}></TextItem>
            </Flex>
            : ''}
          </Flex>
        </Center>
      </Container>
      <Footer></Footer>
    </Flex>
  );
}
