import { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const removerDelCarrito = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  // Soporte para ambos formatos: precio (MockAPI) y price (FakeStoreAPI)
  const totalCarrito = carrito.reduce((acc, item) => {
    const precio = parseFloat(item.precio || item.price) || 0;
    return acc + precio;
  }, 0);

  const value = {
    carrito,
    agregarAlCarrito,
    removerDelCarrito,
    vaciarCarrito,
    totalCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};