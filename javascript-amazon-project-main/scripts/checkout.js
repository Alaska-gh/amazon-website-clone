import { renderCheckoutItems } from "./checkout/checkoutHeader.js";
import { renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

renderOrderSummary();

renderCheckoutItems();

renderPaymentSummary();