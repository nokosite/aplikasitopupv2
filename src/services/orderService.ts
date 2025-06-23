// Simplified order service using in-memory storage
export interface Order {
  id: string;
  gameName: string;
  productName: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  date: string;
  userId: string;
  gameImage?: string;
  paymentMethod?: string;
}

class OrderService {
  private orders: Order[] = [];

  async saveOrder(order: Omit<Order, 'id' | 'date'>): Promise<Order> {
    try {
      const newOrder: Order = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        ...order,
        date: new Date().toISOString().split('T')[0],
      };

      this.orders = [newOrder, ...this.orders];
      return newOrder;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      return [...this.orders];
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async getOrdersByUser(userId: string): Promise<Order[]> {
    try {
      return this.orders.filter(order => order.userId === userId);
    } catch (error) {
      console.error('Error getting user orders:', error);
      return [];
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    try {
      this.orders = this.orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      );
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async clearUserOrders(userId: string): Promise<void> {
    try {
      this.orders = this.orders.filter(order => order.userId !== userId);
    } catch (error) {
      console.error('Error clearing user orders:', error);
      throw error;
    }
  }

  async clearAllOrders(): Promise<void> {
    try {
      this.orders = [];
    } catch (error) {
      console.error('Error clearing all orders:', error);
      throw error;
    }
  }

  // Method to create sample orders for testing
  async createSampleOrders(userId: string): Promise<void> {
    const sampleOrders = [
      {
        gameName: 'Mobile Legends',
        productName: '86 Diamond',
        amount: 12000,
        status: 'success' as const,
        userId: userId,
        paymentMethod: 'DANA',
      },
      {
        gameName: 'Free Fire',
        productName: '70 Diamond',
        amount: 10000,
        status: 'pending' as const,
        userId: userId,
        paymentMethod: 'OVO',
      },
      {
        gameName: 'Valorant',
        productName: '125 VP',
        amount: 15000,
        status: 'failed' as const,
        userId: userId,
        paymentMethod: 'GoPay',
      },
      {
        gameName: 'PUBG Mobile',
        productName: '325 UC',
        amount: 45000,
        status: 'success' as const,
        userId: userId,
        paymentMethod: 'Bank Transfer',
      }
    ];

    for (const order of sampleOrders) {
      await this.saveOrder(order);
    }
  }
}

export const orderService = new OrderService(); 