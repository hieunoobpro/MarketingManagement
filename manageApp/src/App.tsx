import React from 'react';
import AuthPage from './Authentication/AuthPage';
import CustomerService from './Service/CustomerService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  React.useEffect(() => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setIsLoggedIn(JSON.parse(savedUser));
      }
    }, []);
  
  return (
    <div>
      {isLoggedIn ? (
        <CustomerService />
      ) : (
        <AuthPage onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;


