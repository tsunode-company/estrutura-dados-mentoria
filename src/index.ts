import { getPayment } from "./get-payment";
import { getPayments } from "./get-payments";

export interface PaymentResponse {
  id: number;
  storeId: number;
  number: string;
  includeFeeTransfer: boolean;
  amount: number;
  netAmount: number;
  fee: number;
  description: string;
  status: string;
  createdOn: string;
  customer: Customer;
  payment: Payment;
}

export interface Customer {
  id: number;
  firstName: string;
  surname: string;
  birthdate: string;
  identificationNumber: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: number;
  number: string;
  amount: number;
  type: "Credit" | "Pix" | "Boleto"; // union types
  installments: number;
  card: Card;
  fraudScore: FraudScore;
  createdOn: string;
  status: string;
}

export interface Card {
  cardBrand: string;
  holderName: string;
  expirationMonth: number;
  expirationYear: number;
  firstDigits: string;
  lastDigits: string;
}

export interface FraudScore {
  score: number;
}

// <> => generic
const payment = getPayment<PaymentResponse>();

const clientName = payment.customer.firstName;
console.log(clientName);

const payments = getPayments<PaymentResponse[]>();

// payments.filter(() => {
//     return
// })

//predicate = true ou false
// console.log([1,2,3].map(() => {}));
// map => [1, 2, 3] => [2,4, 6]
// filter => [1, 2, 3] => [1, 2, 3], [1, 2], [1], []

// [payment, payment, payment]
// ['Tsunode', 'Lucas', 'Maria']

const names = payments.map((item) => {
  return item.customer.firstName;
});

// [payment, payment, payment]
// ['Jorge']
console.log(names);

// [payment, payment, payment, payment, payment, payment]
// [payment, payment, payment, payment]
// true or false => truthy or falsy

// truthy
// []
// {}
// 1 2 3..
// -1 -2, -3..
// 'seedd'
// true

// falsy
// 0
// ''
// undefined
// null
// false
// !! joga duas exclamações ex: !!'' => retorna false

const paymentFiltered = payments
  .filter((item) => item.payment.type === "Credit")
  .map((item) => {
    return {
        ...item,
        fullName: `${item.customer.firstName} ${item.customer.surname}`,
        storeId: 7599999,
        payment: {
            ...item.payment,
            amount: item.payment.amount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
        }
    }
  });
  console.log(paymentFiltered);
  
const paymentsCreditSum = payments
  .filter((payment) => payment.payment.type === "Credit")
  .reduce((previous, current) => {
    return previous + current.payment.amount
  }, 0)


// // [payment1, payment2, payment3]
// // previous current
// payment1     payment2

// [payment1, payment2, payment3]
// previous current
//   0      payment1 150
//  150     payment2 350
//  500     payment3 100
//  600

console.log(paymentsCreditSum);


// const paymentSum = payments.reduce()
// {
//     credit: 100,
//     boleto: 300,
//     pix: 600,
//     total: 1000
// }