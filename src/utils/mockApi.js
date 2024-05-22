import axios from 'axios';

const hotels = [
  { id: 1, name: 'Hotel A', price: 160, rating: 4.5, country: 'Brasil' },
  { id: 2, name: 'Hotel B', price: 200, rating: 4.0, country: 'Argentina' },
  { id: 3, name: 'Hotel C', price: 140, rating: 3.0, country: 'Brasil' },
  { id: 4, name: 'Hotel D', price: 110, rating: 3.0, country: 'Brasil' },
  { id: 5, name: 'Hotel E', price: 600, rating: 5.0, country: 'Canada' },
  { id: 6, name: 'Hotel F', price: 250, rating: 4.6, country: 'Chile' },
  { id: 7, name: 'Hotel G', price: 90, rating: 2.9, country: 'Argentina' },
  { id: 8, name: 'Hotel H', price: 120, rating: 3.9, country: 'Uruguai' },
];

axios.interceptors.request.use((request) => {
  if (request.url === '/api/hotels') {
    request.adapter = () => {
      let filteredHotels = hotels;
      if (request.params?.destination) {
        filteredHotels = hotels.filter(
          (hotel) =>
            hotel.country
              .toLowerCase()
              .includes(request.params?.destination.toLowerCase()) ||
            hotel.name
              .toLowerCase()
              .includes(request.params?.destination.toLowerCase()),
        );
      }

      return Promise.resolve({
        data: filteredHotels,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: request,
      });
    };
  }
  if (request.url === '/api/book') {
    request.adapter = () => {
      return Promise.resolve({
        data: { message: 'Reserva bem-sucedida!' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: request,
      });
    };
  }
  return request;
});
