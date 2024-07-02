import Auth from "../Auth";
import "./style.css";
import { FaAnglesDown } from "react-icons/fa6";
import pcHome from "../../assets/img/pc-home.png";
import CardPlan from "../../components/CardPlan";

import plans from "../../config/plans";
const Index = () => {
  return (
    <>
      <section className="authContainer">
        <Auth />
      </section>
      <div className="newLead">
        <h3>Novo Aqui?</h3>
        <h2>
          <FaAnglesDown />
        </h2>
      </div>
      <section className="aboutContainer">
        <div className="aboutBox">
          <h2>
            A <span className="logo">BroPay</span> é dedicada à eficiência no
            processo de vendas.
          </h2>
          <p>
            Nosso sistema foi desenvolvido com o objetivo de aumentar a sua
            conversão e otimizar o gerenciamento de pedidos. Com várias startups
            em nosso portfólio, a equipe da <span className="logo">BroPay</span>
            está empenhada em oferecer a você tudo em um único sistema.
          </p>
        </div>
        <div className="oportunityBox">
          <div className="oportunityImg">
            <img src={pcHome} alt="" />
          </div>
          <div className="oportunityText">
            <h2 className="logo">Expandindo Horizontes</h2>
            <p>
              A <span className="logo">BroPay</span> Além de um gerenciador de
              pedidos intuitivo e eficiente, nossa plataforma oferece um
              poderoso sistema de e-commerce projetado para ajudá-lo a expandir
              seus horizontes comerciais.
            </p>
            <p>
              Prepare-se para uma experiência única de crescimento e eficiência
              no seu negócio!
            </p>
          </div>
        </div>
      </section>
      <section className="pricingContainer">
        <h2>Nossos Planos</h2>
        <div className="planBox">
          {plans.map((plan) => (
            <CardPlan
              img={plan.img}
              title={plan.title}
              value={plan.value}
              details={plan.details}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
