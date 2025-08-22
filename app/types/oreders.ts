export interface OrderType {
    id: string;
    status: 'confirmed' | 'packed' | 'shipped' | 'delivered';
    createdAt: string;
    items: {
      id: number;
      name: string;
      price: number;
      quantity: number;
      image: string;
      color: string;
      size: string;
    }[];
    shipping: {
      address: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    tracking: {
      number: string;
      carrier: string;
      status: string;
      location: string;
      estimatedDelivery: string;
    };
  }