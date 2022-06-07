// import React, { useContext } from 'react';
import React from 'react';
import { CardGroup } from 'react-bootstrap';
import OrderCard from '../components/OrderCard';
// import AppContext from '../context/AppContext';
// import getData from '../services/getData';
// import apiGetById from '../services/apiGetById';

export default function CustomerOrdersPage() {
  // const { token } = useContext(AppContext);

  // async function decodeUserToken() {
  //   const response = await getData(token);
  // }

  return (
    <div className="customer-orders-page-container">
      <div className="customer-orders-topbar-container">
        {/* Não sei se alguém já fez essa parte então vou deixar em branco por agora */}
      </div>
      <div className="customer-orders-main-container">
        { decodeUserToken() }
        <CardGroup>
          <OrderCard />
        </CardGroup>

      </div>
    </div>
  );
}
// // import React, { useContext, useEffect, useRef } from 'react';
// // import React, { useContext } from 'react';
// import React from 'react';
// import { CardGroup } from 'react-bootstrap';
// import OrderCard from '../components/OrderCard';
// // import AppContext from '../context/AppContext';
// // import getData from '../services/getData';
// // import apiGetById from '../services/apiGetById';

// export default function CustomerOrdersPage() {
//   const { token } = useContext(AppContext);
//   const teste = useRef();

//   function decodeUserToken() {
//     console.log(teste);
//     return <div>teste</div>;
//     // const { token } = useContext(AppContext);

//     async function decodeUserToken() {
//     // const response = await getData(token);
//     }

//     useEffect(() => {
//       const test = async () => {
//         try {
//           const response = await getData(token);

//           console.log(response);
//           console.log(response.id);

//           const result = await apiGetById(response.id, 'customer/orders');

//           console.log(result);

//           return response;
//         } catch (error) {
//           console.log(error, 'aa');
//         }
//       };
//       teste.current = test().then((value) => value);
//     });

//     return (
//       <div className="customer-orders-page-container">
//         <div className="customer-orders-topbar-container">
//           {/* Não sei se alguém já fez essa parte então vou deixar em branco por agora */}
//         </div>
//         <div className="customer-orders-main-container">
//           <CardGroup>
//             <OrderCard />
//           </CardGroup>
//           { decodeUserToken() }
//         </div>
//       </div>
//     );
//   }
// }
