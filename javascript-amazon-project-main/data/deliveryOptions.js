// this function taks a delivery options id as an argument and finds a matching option in the delivery options
export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });
 return deliveryOption || deliveryOptions[0];
}

// data for all the delivery options available
export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]

export default deliveryOptions;