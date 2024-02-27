import React from 'react';
import axios from 'axios';
import {
  FooterWrapperStyled,
  JackpotsWrapperStyled,
  NormalJackpotsWrapperStyled,
  WrapperStyled,
  SpecialJackpotsWrapperStyled,
  ShowcaseContainerWrapperStyled,
  FooterBackgroundStyled,
} from './App.style';
import { toast } from 'react-toastify';
import Jackpot from './Jackpot';
import SpecialJackpot from './SpecialJackpot';
import WinShowcase from './WinShowcase';
import JackpotAnimation from './JackpotAnimation';
import JackpotHistory from './JackpotHistory';
import Background from './Background';

export default function App() {
  const [data, setData] = React.useState({});
  const [prevData, setPrevData] = React.useState({});
  const [lastJackpot, setLastJackpot] = React.useState({});
  const footerRef = React.useRef(null);
  const refreshDataSeconds = React.useMemo(
    () => (data?.controls ? data.controls?.refreshData : 15),
    [data?.controls],
  );

  const fetchData = async () => {
    await axios({
      method: 'GET',
      url: '/api',
    })
      .then(({ data }) => {
        setData((oldData) => {
          if (data.newJackpot) {
            setLastJackpot(data.newJackpot);
          }
          setPrevData(oldData);
          return data;
        });
        if (!data.controls)
          toast.error('Chyba při načtení ovládání z databáze!', {
            autoClose: 3000,
          });
      })
      .catch(() => {
        toast.error('Chyba se spojením se serverem!', { autoClose: 3000 });
      });
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, refreshDataSeconds * 1000);
    fetchData();

    return () => clearTimeout(interval);
  }, [refreshDataSeconds]);

  return (
    <WrapperStyled>
      <JackpotAnimation lastJackpot={lastJackpot} setLastJackpot={setLastJackpot} />
      <JackpotHistory controls={data.controls} jackpots={data.customHistory} />
      <Background />
      {Object.keys(data).length > 0 && (
        <>
          <JackpotsWrapperStyled>
            <NormalJackpotsWrapperStyled>
              {parseInt(data.current.gold.running) ? (
                <Jackpot
                  type='gold'
                  amount={data.current.gold.jackpot}
                  prevAmount={prevData?.current?.gold?.jackpot || 0}
                  minBet={data.controls?.gold?.min || 'xxx'}
                />
              ) : (
                <></>
              )}
              {parseInt(data.current.silver.running) ? (
                <Jackpot
                  type='silver'
                  amount={data.current.silver.jackpot}
                  prevAmount={prevData?.current?.silver?.jackpot || 0}
                  minBet={data.controls?.silver?.min || 'xxx'}
                />
              ) : (
                <></>
              )}
              {parseInt(data.current.bronze.running) ? (
                <Jackpot
                  type='bronze'
                  amount={data.current.bronze.jackpot}
                  prevAmount={prevData?.current?.bronze?.jackpot || 0}
                  minBet={data.controls?.bronze?.min || 'xxx'}
                />
              ) : (
                <></>
              )}
            </NormalJackpotsWrapperStyled>
            <SpecialJackpotsWrapperStyled>
              {parseInt(data.current.red.running) ? (
                <SpecialJackpot
                  type='red'
                  amount={data.current.red.jackpot}
                  prevAmount={prevData?.current?.red?.jackpot || 0}
                  minBet={data.controls?.red?.min || 'xxx'}
                />
              ) : (
                <></>
              )}
              {parseInt(data.current.green.running) ? (
                <SpecialJackpot
                  type='green'
                  amount={data.current.green.jackpot}
                  prevAmount={prevData?.current?.green?.jackpot || 0}
                  minBet={data.controls?.green?.min || 'xxx'}
                />
              ) : (
                <></>
              )}
            </SpecialJackpotsWrapperStyled>
          </JackpotsWrapperStyled>
          <FooterWrapperStyled>
            <FooterBackgroundStyled />
            <ShowcaseContainerWrapperStyled
              ref={footerRef}
              $time={data.history.length || 0}
            >
              {data.history.map((history, index) => (
                <WinShowcase
                  key={index}
                  type={history.sql_jp_name.toLowerCase()}
                  amount={history.jackpot}
                  place={history.sql_city}
                />
              ))}
              {data.history.map((history, index) => (
                <WinShowcase
                  key={index}
                  duplicate={true}
                  type={history.sql_jp_name.toLowerCase()}
                  amount={history.jackpot}
                  place={history.sql_city}
                />
              ))}
            </ShowcaseContainerWrapperStyled>
          </FooterWrapperStyled>
        </>
      )}
    </WrapperStyled>
  );
}
