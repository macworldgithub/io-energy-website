import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AppDataContext } from "./AppDataContext";
import { getPlans, getSignupPlans } from "../../util/plans.js";
import "core-js/actual/object/group-by";

AppDataProvider.propTypes = {
  children: PropTypes.node,
};

export default function AppDataProvider({ children }) {
  const [user, setUser] = useState({
    user: null,
  });

  const [appData, setAppData] = useState({
    address: null,
    plan: null,
    connections: [],
  });

  const [availablePlans, setAvailablePlans] = useState({
    by_customer_type: { RESIDENTIAL: [], BUSINESS: [] },
    by_price_plan_code: {},
    count: 0,
  });

  const [flagshipPlans, setFlagshipPlans] = useState({
    by_customer_type: { RESIDENTIAL: [], BUSINESS: [] },
    by_offering_code: {},
    count: 0,
  });

  useEffect(
    () => {
      const updatePlans = async () => {
        const plans = await getSignupPlans();
        setAvailablePlans({
          by_customer_type: Object.groupBy(plans, (plan) => plan.customer_type),
          by_price_plan_code: Object.fromEntries(
            plans.map((plan) => [plan.price_plan_code, plan]),
          ),
          count: plans.length,
        });

        const flagship_plans = await getPlans();
        setFlagshipPlans({
          by_customer_type: Object.groupBy(
            flagship_plans,
            (plan) => plan.customer_type,
          ),
          by_offering_code: Object.fromEntries(
            flagship_plans.map((plan) => [plan.offering_code, plan]),
          ),
          count: flagship_plans.length,
        });
      };

      updatePlans();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      <AppDataContext.Provider
        value={{
          user,
          setUser,
          appData,
          setAppData,
          availablePlans,
          flagshipPlans,
        }}
      >
        {children}
      </AppDataContext.Provider>
    </div>
  );
}
