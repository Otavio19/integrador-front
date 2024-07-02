import whitePlan from "../assets/img/planoBranco.png";
import bluePlan from "../assets/img/planoAzul.png";
import blackPlan from "../assets/img/planoPreto.png";

const plans = [
  {
    img: whitePlan,
    title: "Branca",
    value: 10.99,
    details: [
      {
        active: true,
        title: "1 Usuário mínimo",
      },
      {
        active: true,
        title: "Cadastro de Produtos",
      },
      {
        active: true,
        title: "Gerenciamento de Pedidos",
      },
      {
        active: false,
        title: "E-commerce",
      },
      {
        active: false,
        title: "Gateway de Pagamentos",
      },
    ],
  },
  {
    img: bluePlan,
    title: "Azul",
    value: 23.99,
    details: [
      {
        active: true,
        title: "3 Usuário mínimo",
      },
      {
        active: true,
        title: "Cadastro de Produtos",
      },
      {
        active: true,
        title: "Gerenciamento de Pedidos",
      },
      {
        active: true,
        title: "E-commerce",
      },
      {
        active: false,
        title: "Gateway de Pagamentos",
      },
    ],
  },
  {
    img: blackPlan,
    title: "Preto",
    value: 48.99,
    details: [
      {
        active: true,
        title: "3 Usuário mínimo",
      },
      {
        active: true,
        title: "Cadastro de Produtos",
      },
      {
        active: true,
        title: "Gerenciamento de Pedidos",
      },
      {
        active: true,
        title: "E-commerce",
      },
      {
        active: true,
        title: "Gateway de Pagamentos",
      },
    ],
  },
];

export default plans;
