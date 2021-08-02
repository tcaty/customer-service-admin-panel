
export default class DDPlanetService {

  _transformUserPhone = (userPhone) => {
    return userPhone.slice(0, 12) + '-' + userPhone.slice(12, 14) + '-' + userPhone.slice(14);
  };

  _trasformAllUserPhones = (orders) => {
    return orders.map(order => ({
        ...order,
        userPhone: this._transformUserPhone(order.userPhone)
    }));
  };

  _sortSettingsByField = (fieldName) => (currentOrder, prevOrder) => {
    return currentOrder[fieldName].toLowerCase() > prevOrder[fieldName].toLowerCase() ? 1 : -1;
  };

  _transformOrder = ({ orderId, firstName, lastName, middleName, userPhone, text }) => ({
    orderId,
    firstName,
    lastName,
    middleName,
    userPhone,
    text
  });

  _transformAllOrders = (orders) => {
    orders.sort(this._sortSettingsByField('lastName'));
    return this._trasformAllUserPhones(orders.map(order => this._transformOrder(order)));
  }

  getAllOrders = async (skip, take) => {
    const url = `/orders/getAllOrders/${skip}/${take}/`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    const data = await res.json();

    return {
      ...data,
      orders: this._transformAllOrders(data.orders)
    };
  };

  _transformOrderForCreating = (order) => {
    const { withoutMiddleName = false, middleName = '' } = order;
    return {
      ...order,
      withoutMiddleName,
      middleName: withoutMiddleName && middleName !== '' ? '' : middleName,
    };
  };

  createOrder = async (order) => {
    const url = '/orders/createOrder';

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this._transformOrderForCreating(order))
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  };

  getOrderById = async (orderId) => {
    const url = `/orders/getOrderById/${orderId}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  };

  deleteOrder = async (orderId) => {
    const url = `/orders/deleteOrder/${orderId}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        accept: 'customer-service-admin-panel/ltcatyl@gmail.com'
      }
    });

    if (!res.ok) {
      throw new Error(`Something goes wrong with fetch ${url}. Error status: ${res.status}`);
    }

    return await res.json();
  }
}
