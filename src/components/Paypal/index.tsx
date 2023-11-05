import React from "react";

import { PayPalButton } from "react-paypal-button-v2";

type PaypalButtonDivProps = {
  price: number
}

const PaypalButtonDiv: React.FC<PaypalButtonDivProps> = ({price}) => {
  const CLIENT_ID_NOSUB =
    "ATWdOnaxQKdaZsz1fyXHyATWO2b8sI5qG_t8ukWRSG6zLQlOOGIArCGnA5F-1dV4BPiMme3_RvEyFQjI&currency=USD";

  return (
    <div className="input-group cien">
      <div>
        <PayPalButton
          amount={price}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={() => {
            /*             Swal.fire({
              title: "Correcto!",
              text:
                "Hemos procesado el pago correctamente, no olvides darle al boton registrarme",
              icon: "success",
            }); */

            // localStorage.setItem("payment_approved", 1);
            console.log("a");
          }}
          shippingPreference="NO_SHIPPING"
          options={{
            clientId: CLIENT_ID_NOSUB,
          }}
        />
      </div>
    </div>
  );
};

export default PaypalButtonDiv;
