import React from 'react';
import TokenSelector from './components/TokenSelector';
import CurrencyConverter from './components/CurrencyConverter';

const App: React.FC = () => {
  return (
    <div>
      <h1 className='text-center text-3xl font-bold'>Bridge Application</h1>
      {/* <TokenSelector /> */}
      <CurrencyConverter/>
    </div>
  );
};

export default App;
