import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle, Trash2} from 'lucide-react';
import {Button, Card, CardHeader, CardTitle} from "react-bootstrap";
import ScrollArea from 'react-scrollbar';
const ServicesTable = ({ title, services, onAdd }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <div className="p-4">
        <table className="w-full">
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b last:border-b-0">
                <td className="py-2">{service.name}</td>
                <td className="py-2 text-right">${service.price.toFixed(2)}</td>
                <td className="py-2 pl-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onAdd(service)}
                  >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Agregar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

const CartSummary = ({ cart, onIncrease, onDecrease, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resumen del Carrito</CardTitle>
      </CardHeader>
      <div className="p-4">
        <ScrollArea className="h-[400px] pr-4">
          {cart.length === 0 ? (
            <p>No hay servicios seleccionados.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline" onClick={() => onDecrease(item)}>
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button size="icon" variant="outline" onClick={() => onIncrease(item)}>
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => onRemove(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
        <div className="mt-4 pt-4 border-t">
          <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
          <Button className="w-full mt-4">Adquirir servicios</Button>
        </div>
      </div>
    </Card>
  );
};

const Services = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('serviceCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('serviceCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (service) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === service.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentCart, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (service) => {
    setCart(currentCart => currentCart.filter(item => item.id !== service.id));
  };

  const increaseQuantity = (service) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (service) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === service.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const barberiaServices = [
    { id: 'b1', name: "Recorte de barba", price: 250 },
    { id: 'b2', name: "Arreglo de barba", price: 355 },
    { id: 'b3', name: "Spa de barba", price: 550 },
    { id: 'b4', name: "Rasurado tradicional", price: 355 },
    { id: 'b5', name: "Rasurado spa", price: 550 },
    { id: 'b6', name: "Recorte de bigote sin delineado", price: 160 },
    { id: 'b7', name: "Arreglo de bigote", price: 230 },
    { id: 'b8', name: "Mascarilla negra carbón activado", price: 315 },
    { id: 'b9', name: "Recorte de ceja", price: 130 },
    { id: 'b10', name: "Planchado de ceja", price: 305 },
    { id: 'b11', name: "Rizado de pestañas", price: 340 },
    { id: 'b12', name: "Rizado de pestañas con tinte", price: 420 },
    { id: 'b13', name: "Tratamiento de crecimiento de barba y bigote", price: 600 },
    { id: 'b14', name: "4 sesiones semanales de tratamiento de crecimiento de barba", price: 2100 },
  ];

  const peluqueriaServices = [
    { id: 'p1', name: "Corte de cabello old school", price: 250 },
    { id: 'p2', name: "Delineado de corte", price: 150 },
    { id: 'p3', name: "Spa de cabello", price: 630 },
    { id: 'p4', name: "Corte de cabello niños (12 años)", price: 200 },
  ];

  const spaServices = [
    { id: 's1', name: "Mascarilla negra (carbón activado)", price: 299 },
    { id: 's2', name: "Facial de limpieza profunda", price: 945 },
    { id: 's3', name: "Facial hidratante", price: 945 },
    { id: 's4', name: "Facial de contorno de ojos", price: 920 },
    { id: 's5', name: "Facial de colágeno y elastina", price: 1100 },
    { id: 's6', name: "Facial líneas de expresión con luz pulsada intensa", price: 1200 },
    { id: 's7', name: "Peeling cosmético", price: 1200 },
    { id: 's8', name: "Chocoterapia facial", price: 1050 },
    { id: 's9', name: "Facial anti acné", price: 1050 },
    { id: 's10', name: "Facial despigmentante luz pulsada intensa", price: 1200 },
    { id: 's11', name: "Facial de piedras calientes", price: 1200 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Nuestros Servicios</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <ServicesTable title="Barbería" services={barberiaServices} onAdd={addToCart} />
          <ServicesTable title="Peluquería" services={peluqueriaServices} onAdd={addToCart} />
          <ServicesTable title="SPA" services={spaServices} onAdd={addToCart} />
        </div>
        <div className="md:w-1/3">
          <CartSummary 
            cart={cart} 
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;